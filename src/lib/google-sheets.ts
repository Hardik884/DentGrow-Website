import { createSign } from 'node:crypto';

/**
 * Appending demo requests to a private Google Sheet.
 *
 * Google Sheets is the source of truth for leads while there are few enough to
 * read by hand, so this deliberately stays a single append call rather than a
 * client library or a CRM. Everything here runs on the server: the service
 * account's key never reaches the browser, and none of these variables are
 * NEXT_PUBLIC.
 *
 * No dependency is added for it. A service-account grant is a signed JWT
 * exchanged for an access token, which Node can do with `crypto` alone — the
 * same plain `fetch` the rest of this route already used.
 *
 * See README.md for the Google Cloud setup and the environment variables.
 */

/*
 * This module must never be pulled into a client bundle. Importing it from a
 * Client Component would be a build-time mistake rather than a runtime one, so
 * this guard is a backstop that fails loudly instead of silently shipping the
 * shape of the credential handling to the browser. (The `server-only` package
 * does the same job at build time; this avoids adding a dependency for it.)
 */
if (typeof window !== 'undefined') {
  throw new Error(
    'google-sheets.ts is server-only and must not be imported from the client.'
  );
}

/** Enough to append rows to a sheet the service account has been shared on. */
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

/** The columns, in sheet order. */
export interface DemoRequestRow {
  name: string;
  mobile: string;
  email: string;
  message: string;
}

export type SheetsErrorCode = 'not_configured' | 'auth_failed' | 'append_failed';

export class SheetsError extends Error {
  readonly code: SheetsErrorCode;

  constructor(code: SheetsErrorCode, message: string) {
    super(message);
    this.name = 'SheetsError';
    this.code = code;
  }
}

interface Config {
  spreadsheetId: string;
  clientEmail: string;
  privateKey: string;
  sheetName: string;
}

/**
 * Read the configuration, or return null if it is incomplete.
 *
 * Never throws with a value in the message: a missing key is reported by name
 * only, so nothing sensitive can reach a log line.
 */
function readConfig(): Config | null {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  const missing = [
    !spreadsheetId && 'GOOGLE_SHEETS_SPREADSHEET_ID',
    !clientEmail && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    !rawKey && 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
  ].filter(Boolean);

  if (missing.length > 0) {
    console.error(
      `[demo-request] Google Sheets is not configured. Missing: ${missing.join(', ')}.`
    );
    return null;
  }

  return {
    spreadsheetId: spreadsheetId!,
    clientEmail: clientEmail!,
    // Hosting dashboards store the key on one line with escaped newlines, and
    // some wrap the whole value in quotes. Both are normalised back to PEM.
    privateKey: rawKey!.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n'),
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Demo Requests',
  };
}

const base64url = (input: Buffer | string) =>
  Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

/** A signed assertion that this service account may act for itself. */
function createAssertion(config: Config): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: config.clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    })
  );

  const signingInput = `${header}.${claims}`;
  const signature = createSign('RSA-SHA256')
    .update(signingInput)
    .sign(config.privateKey);

  return `${signingInput}.${base64url(signature)}`;
}

/**
 * Access tokens are good for an hour, so one is kept for the life of the
 * server instance rather than minted per submission. Refreshed a minute early
 * so a token can never expire mid-request.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(config: Config): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  let response: Response;
  try {
    response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: createAssertion(config),
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new SheetsError(
      'auth_failed',
      `Could not reach Google's token endpoint: ${describe(error)}`
    );
  }

  if (!response.ok) {
    // Google echoes an error code here, never the assertion, so it is safe to
    // surface. Read as text so a non-JSON error page cannot throw.
    const detail = await response.text().catch(() => '');
    throw new SheetsError(
      'auth_failed',
      `Token request rejected (${response.status}): ${detail.slice(0, 200)}`
    );
  }

  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!payload.access_token) {
    throw new SheetsError('auth_failed', 'Token response carried no access_token.');
  }

  cachedToken = {
    value: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000 - 60_000,
  };
  return cachedToken.value;
}

/** A1 notation: a sheet name with anything but word characters must be quoted. */
function rangeFor(sheetName: string): string {
  const needsQuotes = !/^[A-Za-z0-9_]+$/.test(sheetName);
  const name = needsQuotes ? `'${sheetName.replace(/'/g, "''")}'` : sheetName;
  return `${name}!A:F`;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Append one demo request and resolve only once Google has confirmed the write.
 *
 * The caller reports success to the visitor on the strength of this promise, so
 * it must never resolve on a request that did not land.
 */
export async function appendDemoRequest(row: DemoRequestRow): Promise<void> {
  const config = readConfig();
  if (!config) {
    throw new SheetsError('not_configured', 'Google Sheets credentials are absent.');
  }

  const token = await getAccessToken(config);

  /*
   * RAW, not USER_ENTERED.
   *
   * USER_ENTERED runs each value through the same parser the Sheets UI uses,
   * which would turn a submitted "=IMPORTXML(...)" into a live formula in a
   * sheet a colleague later opens — a spreadsheet-injection hole fed straight
   * from a public form. It would also mangle "+91 80 4718 2200" into a number.
   * RAW stores exactly the characters that were submitted.
   */
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}` +
    `/values/${encodeURIComponent(rangeFor(config.sheetName))}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  // Submitted At is generated here, never taken from the client.
  const submittedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            submittedAt,
            row.name,
            row.mobile,
            row.email,
            row.message,
            // Every lead starts here; the column is then managed by hand.
            'New',
          ],
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new SheetsError(
      'append_failed',
      `Could not reach the Sheets API: ${describe(error)}`
    );
  }

  if (!response.ok) {
    // A stale cached token would produce a 401; drop it so the next attempt
    // mints a fresh one rather than failing the same way.
    if (response.status === 401) cachedToken = null;
    const detail = await response.text().catch(() => '');

    // The two misconfigurations that actually happen, named plainly. Google's
    // own wording for them ("Unable to parse range", a bare 403) says nothing
    // about which piece of setup is wrong.
    let hint = '';
    if (detail.includes('Unable to parse range')) {
      hint =
        ` — the spreadsheet has no tab called "${config.sheetName}". Rename the` +
        ` tab to match, or set GOOGLE_SHEETS_SHEET_NAME to the tab's real name` +
        ` (a new sheet's first tab is called "Sheet1").`;
    } else if (response.status === 403) {
      hint =
        ` — share the spreadsheet with ${config.clientEmail} and give it Editor` +
        ` access, or check that the Google Sheets API is enabled for the project.`;
    } else if (response.status === 404) {
      hint = ' — check GOOGLE_SHEETS_SPREADSHEET_ID against the id in the sheet URL.';
    }

    throw new SheetsError(
      'append_failed',
      `Sheets API rejected the append (${response.status})${hint} ${detail.slice(0, 300)}`
    );
  }
}
