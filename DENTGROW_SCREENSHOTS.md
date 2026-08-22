# DentGrow screenshots

Three screenshots of the **real DentGrow application**, captured with Playwright
against a local dev server (`npm run dev:local`) pointed at the local Supabase
container. Nothing here is a mockup, and no page was built for the purpose.

All data is disposable local demo data for the fictional **BrightSmile Dental
Studio** (`00000000-0000-0000-0000-000000000001`), signed in as
`brain@dentgrow.test`. No production database was touched and no real patient
information appears in any frame.

Capture settings, identical for all three: **1440 × 900** viewport at
`deviceScaleFactor: 2` (files are 2880 × 1800), `Asia/Kolkata`, light theme,
fonts resolved, no loading states, dev-tools badge and scrollbars suppressed.

Files live in `public/images/dentgrow/`.

---

## 1. Main workspace

| | |
|---|---|
| **File** | `dentgrow-main-workspace.png` |
| **Screen** | `/dentist` — Today's Dashboard |
| **Shows** | KPI row (appointments, patients seen, completion rate, waiting, no-shows, revenue, new patients, walk-ins), Upcoming Today, and the Live Queue |
| **Appears in** | Product showcase section, full-bleed banner (`Featured`) |

## 2. Clinical workflow

| | |
|---|---|
| **File** | `dentgrow-clinical-workflow.png` |
| **Screen** | `/dentist/patients/[id]?tab=dental-chart` — patient profile, Dental Chart tab |
| **Shows** | Patient header with visit history and outstanding balance, the record tabs, and the FDI dental chart with per-tooth status |
| **Appears in** | "Treat with context" section, full-bleed banner (`FinancialFreedom`) |

## 3. Business Brain

| | |
|---|---|
| **File** | `dentgrow-business-brain.png` |
| **Screen** | `/dentist/business-brain` — the daily briefing |
| **Shows** | Clinic health score, "Needs attention" signals worst-first, and the matching "What to do" actions |
| **Appears in** | "Don't just see your clinic" section, full-bleed banner (`FinancialFuture`) |

---

## Derived crops

The smaller product visuals in the page are crops of these same three frames —
no fourth screen was captured and no pixels were invented:

| File | Cropped from | Used by |
|---|---|---|
| `offer_queue.png` | main workspace — Live Queue widget | "Appointments and queue" card |
| `offer_patient.png` | clinical workflow — patient header | "Patients and history" card |
| `offer_chart.png` | clinical workflow — dental arches | "Clinical records" card |
| `offer_revenue.png` | main workspace — Revenue KPI | "Billing and payments" card |
| `panel_left.png` | main workspace — today's numbers | Operations, fanned panel (left) |
| `panel_centre.png` | main workspace — navigation rail | Operations, fanned panel (centre) |
| `panel_right.png` | main workspace — today's list | Operations, fanned panel (right) |
| `*_banner_mobile.png` | portrait crops of each frame | the same sections below 768px |

The full-bleed desktop banners are the three source files themselves: their slots
use `object-fit: cover` with `object-position: left top`, which crops to exactly
the framing a pre-cropped file would have had, so no second copy is stored.
