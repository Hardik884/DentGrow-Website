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
| `panel_left.png` | Today's Dashboard — KPI tiles | Operations, fanned panel (left / "today's numbers") |
| `panel_centre.png` | Today's Dashboard — the nav rail | Operations, fanned panel (centre / navigation) |
| `panel_right.png` | Appointments — the list | Operations, fanned panel (right / "today's appointments") |

The three full-bleed desktop banners (`dashboard-workspace.png`,
`clinical-workflow.png`, `business-brain-daily.png`) are used as-is: their
slots use `object-fit: cover` with `object-position: left top`, so the
browser does the cropping to whatever the container's actual size is — no
second copy is stored. Every other file is a deliberate manual crop of its
source capture, sized for the slot it fills.

## What changed from the previous round

The prior screenshot set was captured against DentGrow-branded seed data and
covered three screens (dashboard, clinical workflow, business brain). This
round recaptures against the app's current OraMedha branding, adds three
screens the marketing site didn't have real coverage for (patient history,
billing & payments, and a dedicated appointments list — previously the
"Billing and payments" card used a crop of the dashboard's revenue tile
rather than the actual Billing & Payments screen), and replaces every prior
file. No old DentGrow-branded screenshot remains anywhere in the repo.
