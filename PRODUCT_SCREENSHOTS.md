# Product screenshots

The screenshots on the marketing site are real captures of the OraMedha PMS
(the actual practice-management application — a separate local repository),
taken with Playwright against a real, running instance. Nothing here is a
mockup, an illustration, or hand-built UI.

## Source

- **App**: OraMedha PMS, run locally via `npm run dev:local` (points at a
  local Supabase instance — never the hosted/production project).
- **Data**: the seeded demo clinic **BrightSmile Dental Studio**
  (`00000000-0000-0000-0000-000000000001`), signed in as `brain@dentgrow.test`.
  All patients, appointments, treatments and payments are disposable local
  demo data — no real patient information appears in any frame.
- **"Today"**: the clinic's seeded activity was originally anchored to a
  fixed date. Before capture, that clinic's appointment/treatment/payment/
  queue timestamps were shifted forward (in the local Supabase container
  only) so the app's own "today" — whatever day it's actually run on — lands
  on a populated day rather than an empty one. This is a date shift of
  existing seed data, not fabricated activity.
- **Capture**: Playwright driving real Chromium, `deviceScaleFactor: 2`,
  `Asia/Kolkata`, light theme, one dedicated browser context (and viewport)
  per screen so each screenshot gets the composition suited to it rather
  than a single fixed size stretched everywhere. Fonts, network and a settle
  delay are all awaited before the shot; scrollbars are hidden for capture.

## The six screens captured

| Screen | PMS route | Viewport | Patient/data shown |
|---|---|---|---|
| Today's Dashboard | `/dentist` | 1920×1150 | Full day: 24 appointments, live queue, KPIs |
| Actions (Business Brain) | `/dentist/business-brain` | 1680×1300 | Clinic health 67 · 4 "Needs attention" findings paired with 4 "What to do" actions |
| Patient Profile — Treatments | `/dentist/patients/[id]?tab=treatments` | 1600×1100 | Priya Nair — 4 visits, 6 treatments, a real outstanding balance |
| Patient Profile — Dental Chart | `/dentist/patients/[id]?tab=dental-chart` | 1920×1150 | Rohan Patel — the one seeded patient whose chart spans every tooth status (recommended, planned, in-progress, completed, missing) |
| Billing & Payments | `/dentist/payments` | 1680×1200 | Today's revenue, 10 patients with remaining balances, a real payment ledger |
| Appointments | `/dentist/appointments?filter=today` | 1680×1200 | 32 appointments across dates, doctors and statuses |

## Files and where they're used

All files live in `public/images/product/`.

| File | Derived from | Used by |
|---|---|---|
| `dashboard-workspace.png` | Today's Dashboard (full capture, resized) | `Featured` full-bleed banner |
| `workspace_banner_mobile.png` | Today's Dashboard, portrait crop | `Featured`, below 768px |
| `clinical-workflow.png` | Dental Chart (full capture, resized) | `FinancialFreedom` full-bleed banner |
| `clinical_banner_mobile.png` | Dental Chart, portrait crop | `FinancialFreedom`, below 768px |
| `business-brain-daily.png` | Actions (full capture, resized) | `FinancialFuture` full-bleed banner |
| `brain_banner_mobile.png` | Actions, portrait crop | `FinancialFuture`, below 768px |
| `brain_attention.png` | Actions — the "Needs attention" column | "See what needs attention" card |
| `brain_action.png` | Actions — the "What to do" column | "Know what to do next" card |
| `offer_queue.png` | Today's Dashboard — the Live Queue widget | "Appointments and queue" card |
| `offer_patient.png` | Patient Profile (Priya Nair) — header + treatments | "Patients and history" card |
| `offer_chart.png` | Dental Chart — both arches + legend | "Clinical records" card |
| `offer_billing.png` | Billing & Payments — revenue + remaining balances | "Billing and payments" card |
| `appointments-workspace.png` | Appointments (full capture, resized) | Operations, the full-width banner under "Less front-desk chaos" |

### Crop aspects

The four `offer_*` previews are cropped to a common ~1.45 aspect, so the set
renders at one consistent size and the cards crop nothing further at render
time. Changing one of them means matching that aspect, or the card it sits in
will start cropping it.

`panel_right.png` is gone. Operations used to carry a cropped slice of the
appointments list at 44rem, which shrank a whole screen to 704px and left its
text at about half size; it now shows `appointments-workspace.png` full width,
the same treatment as the dashboard banner.

### The `offer_*` previews must be TIGHT crops

`ImageCtn` caps these at `max-height: min(17rem, 100%)`, so each renders at about
**394×272 on screen** no matter how large the file is. The scale from crop to slot
is therefore:

```
on-screen scale = 394 / (crop width in CSS px)
```

That single number decides whether the preview is readable. A round of these
cropped 1364–1650 CSS px of full-width layout into that slot — 0.24–0.29×, which
put 14px body text on screen at 3–4px. It looked zoomed-out and washed, and no
amount of extra output resolution helps, because the limit is the slot.

`offer_queue` was always the readable one: a queue widget is only 392 CSS px
wide, so it lands at ~1.0× and its text stays full size. The other three now
follow it — **one legible component each, never a whole screen shrunk**. Keep new
crops at or above ~0.6×; the crop script prints each one's scale when it runs.

The corollary is that these four are stored at their **capture resolution** rather
than resized up to a fixed width. Upscaling a 1040px crop to 2650px would add
blur and no detail; what the layout needs from these files is the aspect, and
~1000px against a ~394px slot is already two and a half times retina.

Operations previously also carried a figures tile and a navigation tile
(`panel_left.png`, `panel_centre.png`) as a supporting pair under the schedule.
Both were dropped — they repeated what the section's own copy says — and their
files removed.

The three full-bleed desktop banners (`dashboard-workspace.png`,
`clinical-workflow.png`, `business-brain-daily.png`) are used as-is: their
slots use `object-fit: cover` with `object-position: left top`, so the
browser does the cropping to whatever the container's actual size is — no
second copy is stored. Every other file is a deliberate manual crop of its
source capture, sized for the slot it fills.

## Reproducing them

Both steps are committed, which they were not for the previous round — that set
was shot by hand, so "re-shoot the screenshots" was an undocumented job:

```bash
node scripts/capture-product-screenshots.mjs   # six full screens  -> capture/
node scripts/crop-product-screenshots.mjs      # thirteen shipped  -> public/images/product/
```

`capture/` is gitignored: it is large, and everything in it is reproducible.

The crop script hard-codes each output size, because those are the sizes the
site's slots were tuned against — the four `offer_*` previews in particular share
a ~1.45 aspect so the card row renders at one consistent size. It also hard-codes
each region in CSS pixels, and that is the one part of the pipeline that needs
revisiting if the app's layout changes materially.

## What changed in this round

Recaptured against the app's new brand mark: every prior frame showed the retired
tooth-and-arrow logo in the sidebar.

Two data facts had to be right before the captures were worth keeping. Both are
easy to miss and both quietly degrade the result rather than failing loudly:

- The demo clinic's activity is shifted forward so the app's own "today" lands on
  the densest seeded day (24 appointments) rather than a near-empty one.
  **`queue_entries.queue_date` is a column in its own right, not derived from
  `checked_in_at`**, so it has to be shifted too — miss it and the dashboard's
  Live Queue renders "Queue is empty" while the database plainly has patients
  waiting, which is exactly what happened on the first pass here.
- The Next.js dev-tools bubble sits bottom-left and is the one thing in these
  frames that is not the product. The capture script hides it.

The frames also now show work that landed alongside the brand change: the Actions
screen states severity in words rather than colour alone, carries a
forward-looking "Next week is filling up slowly" finding, and labels ownership
"Delegate".

## The round before this one

The prior set was captured against DentGrow-branded seed data and covered three
screens (dashboard, clinical workflow, business brain). It was replaced by a
round that recaptured against OraMedha branding and added three screens the site
had no real coverage for — patient history, billing & payments, and a dedicated
appointments list. No DentGrow-branded screenshot remains anywhere in the repo.
