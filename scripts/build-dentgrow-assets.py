"""
Derive the site's smaller product imagery from the three real DentGrow
screenshots.

Nothing here draws UI. Every output is a crop of a captured frame of the running
application (see DENTGROW_SCREENSHOTS.md), resampled into the slot it occupies so
the layout is untouched. This file is the provenance of those images: the boxes
below record exactly which region of which screen each one came from.

Source frames are 2880x1800 — captured at a 1920x1200 viewport and written down
to 1440x900 at 2x. All boxes are in source pixels.

Requires Pillow. Run from anywhere:

    python scripts/build-dentgrow-assets.py
"""

import os
from PIL import Image, ImageDraw

SRC = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public",
    "images",
    "dentgrow",
)
OUT = SRC

WORKSPACE = os.path.join(SRC, "dentgrow-main-workspace.png")
CLINICAL = os.path.join(SRC, "dentgrow-clinical-workflow.png")
BRAIN = os.path.join(SRC, "dentgrow-business-brain.png")


def panel(src, box, size, name, radius=14, transparent=True):
    """A cropped region of a real screen, resampled into an illustration slot."""
    im = Image.open(src).convert("RGB").crop(box).resize(size, Image.LANCZOS)

    if not transparent:
        im.save(os.path.join(OUT, name), optimize=True)
        print(name, im.size)
        return

    # Rounded corners so the panel reads as a card on the dark section
    # background instead of a hard-edged rectangle.
    out = im.convert("RGBA")
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius, fill=255)
    out.putalpha(mask)

    border = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        [0, 0, size[0] - 1, size[1] - 1], radius, outline=(255, 255, 255, 46), width=1
    )
    Image.alpha_composite(out, border).save(os.path.join(OUT, name), optimize=True)
    print(name, out.size)


# The full-bleed desktop banners are NOT generated here. Each slot renders with
# `object-fit: cover` and `object-position: left top`, which crops the source to
# exactly the same framing a pre-cropped file would have had — so the sections
# point straight at dentgrow-main-workspace.png / -clinical-workflow.png /
# -business-brain.png rather than carrying a second copy of the same pixels.

# ── Mobile banners: portrait crops of the same frames ────────────────────────
# Written at the crop's native resolution rather than at the CSS slot size. The
# slot uses `fill`, so intrinsic pixels do not affect layout — but the banner is
# still ~690px wide at the 768px breakpoint, and a 342px-wide file would be
# upscaled there and go visibly soft. Opaque and unrounded: the container
# already rounds the corners.
# Right edge sits on the KPI grid's second column boundary rather than through
# a card, so the narrow crop ends on an edge the layout actually has.
panel(WORKSPACE, (374, 150, 1290, 1168), (916, 1018), "workspace_banner_mobile.png", transparent=False)
panel(CLINICAL, (374, 130, 1620, 1514), (1246, 1384), "clinical_banner_mobile.png", transparent=False)
panel(BRAIN, (382, 150, 1289, 1313), (907, 1163), "brain_banner_mobile.png", transparent=False)

# ── Offer-card illustrations ─────────────────────────────────────────────────
# Live queue widget — the front desk's view of who is in the building.
panel(WORKSPACE, (1600, 695, 2226, 1025), (448, 236), "offer_queue.png")
# The patient record: who they are, when they were last seen, what they owe.
panel(CLINICAL, (374, 130, 1620, 825), (409, 228), "offer_patient.png")
# The dental chart's arches and its status legend.
panel(CLINICAL, (950, 900, 2200, 1411), (362, 148), "offer_chart.png")
# The day's takings, as the dashboard reports them.
panel(WORKSPACE, (843, 438, 1288, 727), (293, 190), "offer_revenue.png")

# ── Intro section's three fanned panels ──────────────────────────────────────
# Centre (portrait): the navigation rail — every part of the clinic in one list.
panel(WORKSPACE, (0, 0, 360, 569), (222, 351), "panel_centre.png", radius=12)
# Left (landscape): today's numbers.
panel(WORKSPACE, (384, 130, 1286, 702), (350, 222), "panel_left.png", radius=12)
# Right (landscape): today's list of patients.
panel(WORKSPACE, (384, 700, 1588, 1362), (711, 391), "panel_right.png", radius=12)

# ── Business Brain's two columns, for the two cards that describe them ───────
# Same crop geometry for both so the pair sits evenly in the section.
# Left: the problems, worst first, each with its number.
panel(BRAIN, (368, 445, 1292, 1138), (480, 360), "brain_attention.png", radius=12)
# Right: the matching step for each one, with the button that starts it.
panel(BRAIN, (1298, 445, 2222, 1138), (480, 360), "brain_action.png", radius=12)

print("done")
