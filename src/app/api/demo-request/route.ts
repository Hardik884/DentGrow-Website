import { NextResponse } from 'next/server';
import {
  hasErrors,
  validateDemoRequest,
  type DemoRequest,
} from '@/components/Common/DemoDialog/validation';
import { appendDemoRequest, SheetsError } from '@/lib/google-sheets';

/**
 * POST /api/demo-request — receives a demo request from the site's one form.
 *
 * Leads go to a private Google Sheet, which is the source of truth while there
 * are few enough of them to work through by hand. There is deliberately no
 * table and no CRM behind this: one row per submission, with a Status column a
 * human moves on from "New".
 *
 * The browser's copy of the validation exists to give fast, per-field feedback.
 * This copy exists because that one can be skipped entirely — anything can POST
 * here, so every field is checked again before it reaches the sheet.
 *
 * A 200 means Google confirmed the row. If the sheet is unreachable or the
 * credentials are absent the handler fails loudly rather than reporting a
 * success it cannot back up. See README.md for the setup.
 */

export const runtime = 'nodejs';
// The endpoint has a side effect and must never be prerendered or cached.
export const dynamic = 'force-dynamic';

/** Requests larger than this are rejected before parsing. */
const MAX_BODY_BYTES = 8_000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'too_large' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const values = normalise(body);
  const errors = validateDemoRequest(values);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: 'invalid', errors }, { status: 422 });
  }

  try {
    await appendDemoRequest({
      name: values.name.trim(),
      mobile: values.mobile.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
  } catch (error) {
    if (error instanceof SheetsError) {
      // The message names what failed and never carries the key or the token.
      console.error(`[demo-request] ${error.code}: ${error.message}`);
      return error.code === 'not_configured'
        ? NextResponse.json({ error: 'not_configured' }, { status: 503 })
        : NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
    }
    console.error('[demo-request] unexpected failure appending the row', error);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/** Coerce an unknown JSON body into the shape the validator expects. */
function normalise(body: unknown): DemoRequest {
  const source = (body ?? {}) as Record<string, unknown>;
  const str = (value: unknown) => (typeof value === 'string' ? value : '');
  return {
    name: str(source.name),
    mobile: str(source.mobile),
    email: str(source.email),
    message: str(source.message),
  };
}
