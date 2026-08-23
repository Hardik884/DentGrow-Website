import { NextResponse } from 'next/server';
import {
  hasErrors,
  validateDemoRequest,
  type DemoRequest,
} from '@/components/Common/DemoDialog/validation';

/**
 * POST /api/demo-request — receives a demo request from the site's one form.
 *
 * This is a marketing site with no database of its own, so the handler does not
 * try to be one. It validates the request and forwards it to whatever endpoint
 * `DEMO_WEBHOOK_URL` names — a Slack incoming webhook, a Zapier/Make catch
 * hook, an n8n workflow, a CRM intake URL. That keeps the site free of a
 * datastore while making sure a submission actually lands somewhere.
 *
 * If `DEMO_WEBHOOK_URL` is not set, the handler returns 503 and the form shows
 * its error state. It deliberately does NOT report success: a form that says
 * "thanks" while dropping the request on the floor is worse than one that
 * admits it is not configured. See README.md for the setup.
 */

export const runtime = 'nodejs';
// The endpoint has a side effect and must never be prerendered or cached.
export const dynamic = 'force-dynamic';

/** Requests larger than this are rejected before parsing. */
const MAX_BODY_BYTES = 8_000;

export async function POST(request: Request) {
  const webhookUrl = process.env.DEMO_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      '[demo-request] DEMO_WEBHOOK_URL is not set, so there is nowhere to ' +
        'deliver this request. Refusing rather than reporting a false success.'
    );
    return NextResponse.json(
      { error: 'not_configured' },
      { status: 503 }
    );
  }

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
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'dentgrow-marketing-site',
        submittedAt: new Date().toISOString(),
        name: values.name.trim(),
        mobile: values.mobile.trim(),
        email: values.email.trim(),
        message: values.message.trim() || null,
        // Slack ignores unknown keys but renders `text`, so one webhook shape
        // works for both a chat channel and a generic JSON consumer.
        text:
          `New DentGrow demo request\n` +
          `Name: ${values.name.trim()}\n` +
          `Mobile: ${values.mobile.trim()}\n` +
          `Email: ${values.email.trim()}` +
          (values.message.trim() ? `\nMessage: ${values.message.trim()}` : ''),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        `[demo-request] webhook responded ${response.status} ${response.statusText}`
      );
      return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
    }
  } catch (error) {
    console.error('[demo-request] webhook request failed', error);
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
