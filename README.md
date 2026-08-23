# DentGrow — marketing site

The public site for DentGrow, a dental practice management system. Next.js App
Router, styled-components, GSAP and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Demo requests

The site's only call to action is **Book a Demo**. Every instance of that button
opens one dialog, which posts to `POST /api/demo-request`.

This site has no database. The route handler validates the request and forwards
it to a webhook, so a submission always ends up somewhere without the site
needing storage of its own.

### Required configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `DEMO_WEBHOOK_URL` | yes | The endpoint each validated demo request is POSTed to. |

Set it in `.env.local` for development, and in the hosting provider's
environment for a deployment:

```bash
DEMO_WEBHOOK_URL="https://hooks.slack.com/services/…"
```

Anything that accepts a JSON `POST` works — a Slack incoming webhook, a
Zapier or Make catch hook, an n8n workflow, a CRM intake URL. The body is:

```json
{
  "source": "dentgrow-marketing-site",
  "submittedAt": "2026-08-23T02:12:30.751Z",
  "name": "Dr. Ananya Mehta",
  "mobile": "+91 80 4718 2200",
  "email": "ananya@example.com",
  "message": "Three chairs, two dentists.",
  "text": "New DentGrow demo request\nName: …"
}
```

`text` is included so the same webhook renders as a readable message in Slack
while remaining ordinary JSON for anything else.

**If `DEMO_WEBHOOK_URL` is not set the endpoint returns 503 and the form shows
its error state.** That is deliberate: a form that thanks someone while dropping
their details is worse than one that admits it is not wired up. The success
state appears only when the webhook has accepted the request.

Responses: `200` delivered · `422` validation failed (with per-field messages) ·
`400` malformed JSON · `502` the webhook rejected or timed out · `503` not
configured.

## Product imagery

Every product visual is a screenshot of the real DentGrow application, captured
with Playwright against a local development instance. See
[DENTGROW_SCREENSHOTS.md](DENTGROW_SCREENSHOTS.md) for what was captured and
where each image is used, and `scripts/build-dentgrow-assets.py` for the crops
derived from them.
