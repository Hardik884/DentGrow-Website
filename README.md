# OraMedha — marketing site

The public site for OraMedha, a dental practice management system. Next.js App
Router, styled-components, GSAP and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Demo requests

The site's only call to action is **Book a Demo**. Every instance of that button
opens one dialog, which posts to `POST /api/demo-request`. The route validates
every field again on the server and appends one row to a **private Google
Sheet**, which is the source of truth for leads while there are few enough to
work through by hand. There is no database table and no CRM.

The success state appears only after Google has confirmed the row.

### The sheet

Create a normal Google Sheet and give the first row these headers, in this
order:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Submitted At | Name | Mobile | Email | Message | Status |

New submissions are appended below. **Submitted At** is generated on the server
(ISO 8601 UTC, e.g. `2026-08-23T13:57:45Z`) and never taken from the browser.
**Status** is written as `New`; from there the column is yours to manage — change
it to `Contacted`, `Booked`, `Closed`, whatever suits.

Leave the sheet private. It only needs to be shared with the service account
below and with whoever on your team reads the leads.

> Values are written with the Sheets API's `RAW` option, so a submitted
> `=IMPORTXML(...)` is stored as text rather than becoming a live formula in a
> sheet someone later opens, and `+91 80 4718 2200` stays a phone number instead
> of being parsed as a formula.

### Google credentials

You need a **service account** — a Google identity that belongs to the app
rather than to a person. An API key will not work: API keys cannot write to a
private sheet.

1. **Google Cloud project** — open the [Cloud Console](https://console.cloud.google.com/),
   and create a project or pick an existing one.
2. **Enable the API** — *APIs & Services → Library*, search for **Google Sheets
   API**, click **Enable**.
3. **Create the service account** — *APIs & Services → Credentials → Create
   credentials → Service account*. Give it a name (e.g. `dentgrow-site-leads`)
   and create it. No project roles are needed: its access comes from the sheet
   being shared with it, not from IAM.
4. **Create a key** — open the service account, *Keys → Add key → Create new key
   → JSON*. A `.json` file downloads. **This is a credential — do not commit it,
   and do not put it in the repo.** You need two values from it:
   - `client_email` — looks like `dentgrow-site-leads@<project>.iam.gserviceaccount.com`
   - `private_key` — the `-----BEGIN PRIVATE KEY-----…` block
5. **Share the sheet with it** — open your Google Sheet, click **Share**, paste
   the `client_email` address, and give it **Editor**. Uncheck "Notify people".
   This is the step that grants access; without it every append returns 403.
6. **Get the spreadsheet ID** — it is the long id in the sheet's URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEf…XyZ`**`/edit`

### Environment variables

Copy `.env.example` to `.env.local` for development, and set the same variables
in your host's environment (Vercel: *Settings → Environment Variables*) for a
deployment.

| Variable | Required | Value |
| --- | --- | --- |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | yes | The id from the sheet's URL. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | yes | `client_email` from the JSON key. |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | yes | `private_key` from the JSON key. |
| `GOOGLE_SHEETS_SHEET_NAME` | no | Tab name. Defaults to `Demo Requests`. |

**None of these may be prefixed `NEXT_PUBLIC_`.** That prefix inlines a value
into the JavaScript sent to the browser, which would publish the private key to
every visitor. They are read only inside the route handler, which runs on the
server.

**The private key and newlines.** The JSON key holds the private key as a single
line with `\n` escapes. Both forms work:

```bash
# .env.local — one line, escaped newlines, wrapped in double quotes
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADAN…\n-----END PRIVATE KEY-----\n"
```

Pasting the real multi-line PEM into a hosting dashboard's value box works too —
the app normalises either shape. If you see `error:1E08010C:DECODER routines`,
the newlines were lost in transit; re-paste using the escaped single-line form.

**Never commit a key.** `.env*.local` is already gitignored. If a key is ever
exposed, delete it under *Keys* in the Cloud Console and create a new one — the
old key stops working immediately.

### Responses

`200` the row is in the sheet · `422` validation failed (with per-field
messages) · `400` malformed JSON · `413` body too large · `502` Google refused
or was unreachable · `503` the variables above are not set.

`503` and `502` both surface as the form's error state. That is deliberate: a
form that thanks someone while dropping their details is worse than one that
admits it could not deliver. Server logs name what failed — they never contain
the key or the access token.

## Product imagery

Every product visual is a screenshot of the real OraMedha application, captured
with Playwright against a local development instance. See
[DENTGROW_SCREENSHOTS.md](DENTGROW_SCREENSHOTS.md) for what was captured and
where each image is used, and `scripts/build-dentgrow-assets.py` for the crops
derived from them.
