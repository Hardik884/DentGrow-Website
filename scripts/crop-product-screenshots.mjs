/**
 * Derives the thirteen files the marketing site ships from the six full-screen
 * captures in `capture/`.
 *
 * Run `capture-product-screenshots.mjs` first.
 *
 * ## Why crops and not thirteen captures
 *
 * Each slot on the site wants a different piece of the product: the full-bleed
 * banners want a whole screen, the feature cards want one widget or one column.
 * Capturing each separately would mean thirteen browser contexts and thirteen
 * chances for the app's own layout to shift between them; cropping one capture
 * keeps every derivative of a screen consistent with the others.
 *
 * ## Why the output sizes are hard-coded
 *
 * They are the dimensions the files already had. The site's slots were tuned
 * against those, and the four `offer_*` previews in particular share a ~1.45
 * aspect so the card row renders at one consistent size — change an output size
 * and the card it sits in starts cropping it at render time.
 *
 * ## Coordinates
 *
 * Regions are expressed in CSS pixels as measured in the running app, then
 * doubled, because the captures are taken at deviceScaleFactor 2. They are
 * recorded here rather than re-measured each run so a capture and a crop can be
 * reasoned about separately — but they are the one thing in this pipeline that
 * will need revisiting if the app's layout changes materially.
 *
 * Run: node scripts/crop-product-screenshots.mjs
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const IN = 'capture';
const OUT = 'public/images/product';

/** deviceScaleFactor the captures were taken at. */
const DSF = 2;
const px = (cssValue) => Math.round(cssValue * DSF);

/** The app's sidebar width in CSS px — every content-only crop starts after it. */
const SIDEBAR = 256;

await mkdir(OUT, { recursive: true });

/**
 * Crop a region (CSS px) to an exact output size, letting the aspect be driven
 * by the OUTPUT so nothing is squashed: the region's height is recomputed from
 * its width and the target aspect, then the result is resized.
 */
async function region(src, out, { x, y, width }, [outW, outH], label) {
  const image = sharp(`${IN}/${src}.png`);
  const meta = await image.metadata();
  const aspect = outW / outH;

  const left = px(x);
  const top = px(y);
  const w = Math.min(px(width), meta.width - left);
  const h = Math.min(Math.round(w / aspect), meta.height - top);

  await sharp(`${IN}/${src}.png`)
    .extract({ left, top, width: w, height: h })
    .resize(outW, outH, { fit: 'fill' })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/${out}.png`);
  console.log(`${out}.png`.padEnd(28), `${outW}x${outH}`.padEnd(11), `<- ${label}`);
}

/** Resize a whole capture. Used where the capture's aspect already matches. */
async function whole(src, out, [outW, outH], label) {
  await sharp(`${IN}/${src}.png`)
    .resize(outW, outH, { fit: 'fill' })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/${out}.png`);
  console.log(`${out}.png`.padEnd(28), `${outW}x${outH}`.padEnd(11), `<- ${label}`);
}

// ── The three full-bleed desktop banners ─────────────────────────────────────
// Their slots use object-fit: cover with object-position: left top, so the
// browser crops to whatever the container is. The capture viewports were chosen
// so these are straight resizes rather than crops.
await whole('dashboard', 'dashboard-workspace', [2600, 1557], "Today's Dashboard, whole");
await whole('patient-chart', 'clinical-workflow', [2600, 1557], 'Dental Chart, whole');
await whole('business-brain', 'business-brain-daily', [2600, 2012], 'Actions, whole');

// ── The three portrait banners, below 768px ──────────────────────────────────
// Content only: the sidebar is dead weight in a portrait frame on a phone.
await region('dashboard', 'workspace_banner_mobile',
  { x: SIDEBAR, y: 0, width: 1022 }, [800, 900], "Today's Dashboard, portrait");
await region('patient-chart', 'clinical_banner_mobile',
  { x: SIDEBAR, y: 0, width: 899 }, [1455, 1862], 'Dental Chart, portrait');
await region('business-brain', 'brain_banner_mobile',
  { x: SIDEBAR, y: 0, width: 1040 }, [800, 1000], 'Actions, portrait');

// ── The two Actions columns ─────────────────────────────────────────────────
// The page is two paired columns — problems left, what to do right — and the
// two cards on the site show one each. Both start at the first card, below the
// health meter, so the pair reads as the same rows side by side.
await region('business-brain', 'brain_attention',
  { x: 256, y: 341, width: 596 }, [1190, 848], 'Actions, "Needs attention" column');
await region('business-brain', 'brain_action',
  { x: 876, y: 341, width: 596 }, [1188, 848], 'Actions, "What to do" column');

// ── The four offer_* previews, all ~1.45 ────────────────────────────────────
await region('dashboard', 'offer_queue',
  { x: 1080, y: 468, width: 392 }, [759, 510], 'Dashboard, Live Queue widget');
await region('patient-treatments', 'offer_patient',
  // x is inside SIDEBAR: this screen is captured at 1600 wide, where the rail is
  // narrower, and starting at 256 shaved the first character off every heading.
  { x: 236, y: 82, width: 1364 }, [2654, 1830], 'Priya Nair, header + treatments');
await region('patient-chart', 'offer_chart',
  // y starts below the patient header — at 300 the crop opened on the tail of the
  // address and notes rows rather than on the chart itself.
  { x: SIDEBAR, y: 362, width: 1650 }, [2401, 1662], 'Dental Chart, arches + legend');
await region('payments', 'offer_billing',
  { x: 248, y: 82, width: 1408 }, [2845, 1962], 'Billing & Payments, revenue + balances');

// ── Operations' single panel ────────────────────────────────────────────────
await region('appointments', 'panel_right',
  // y clears the view-toggle row above the table; at 300 its bottom edge showed
  // as a green sliver along the top of the crop.
  { x: SIDEBAR, y: 352, width: 1392 }, [1900, 1200], 'Appointments, the list');

console.log('\ndone');
