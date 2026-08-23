# DentGrow screenshots

Three screenshots of the **real DentGrow application**, captured with Playwright
against a local dev server (`npm run dev:local`) pointed at the local Supabase
container. Nothing here is a mockup, and no page was built for the purpose.

All data is disposable local demo data for the fictional **BrightSmile Dental
Studio** (`00000000-0000-0000-0000-000000000001`), signed in as
`brain@dentgrow.test`. No production database was touched and no real patient
information appears in any frame.

**Capture settings, identical for all three:** a **1920 × 1200** viewport at
`deviceScaleFactor: 2`, resampled to **2880 × 1800** (1440 × 900 at 2×).
`Asia/Kolkata`, light theme, fonts resolved, no loading states, dev-tools badge
and scrollbars suppressed.

> Why 1920 rather than a 1440 capture: the banner slots are 1296 × 560 and crop
> the source to its top ~69% with `object-position: left top`. Captured at 1440
> that band stopped just below the KPI grid, and on the patient screen it
> stopped *above* the dental chart — the clinical screenshot showed no teeth.
> Rendering at 1920 puts a third more of the application inside the same band.
> The same treatment is applied to all three, so their zoom matches.

Files live in `public/images/dentgrow/`.

---

## 1. Main workspace

| | |
|---|---|
| **File** | `dentgrow-main-workspace.png` |
| **Screen** | `/dentist` — Today's Dashboard |
| **Shows** | Eight KPI cards (appointments, patients seen, completion rate, waiting, no-shows, revenue, new patients, walk-ins), Upcoming Today with real patient rows and their status, and the Live Queue |
| **Appears in** | Product showcase, full-bleed banner (`Featured`) |

## 2. Clinical workflow

| | |
|---|---|
| **File** | `dentgrow-clinical-workflow.png` |
| **Screen** | `/dentist/patients/[id]?tab=dental-chart` — patient profile, Dental Chart tab |
| **Shows** | Patient context (age, contact, outstanding follow-ups, visit history, balance, notes), the record tabs, and the FDI dental chart with per-tooth status across both arches |
| **Appears in** | "Treat with context", full-bleed banner (`FinancialFreedom`) |

## 3. Business Brain

| | |
|---|---|
| **File** | `dentgrow-business-brain.png` |
| **Screen** | `/dentist/business-brain` — the daily briefing |
| **Shows** | Clinic health score, the "Needs attention" column worst-first with its figures, and the matching "What to do" column with its action buttons |
| **Appears in** | "Don't just see your clinic", contained banner (`FinancialFuture`), sized to match the dashboard banner |

---

## Derived crops

The smaller product visuals are crops of these same three frames — no fourth
screen was captured and no pixels were invented. `scripts/build-dentgrow-assets.py`
holds the exact boxes.

| File | Cropped from | Used by |
|---|---|---|
| `brain_attention.png` | Business Brain — the Needs attention column | "See what needs attention" card |
| `brain_action.png` | Business Brain — the What to do column | "Know what to do next" card |
| `offer_queue.png` | main workspace — Live Queue widget | "Appointments and queue" card |
| `offer_patient.png` | clinical workflow — patient header | "Patients and history" card |
| `offer_chart.png` | clinical workflow — arches and status legend | "Clinical records" card |
| `offer_revenue.png` | main workspace — Revenue KPI | "Billing and payments" card |
| `panel_left.png` | main workspace — today's numbers | Operations, fanned panel (left) |
| `panel_centre.png` | main workspace — navigation rail | Operations, fanned panel (centre) |
| `panel_right.png` | main workspace — today's list | Operations, fanned panel (right) |
| `*_banner_mobile.png` | portrait crops of each frame | the same sections below 768px |

The full-bleed desktop banners are the three source files themselves: their
slots use `object-fit: cover` with `object-position: left top`, which crops to
exactly the framing a pre-cropped file would have had, so no second copy is
stored.
