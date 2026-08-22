"""
Derive the site's smaller product imagery from the three real DentGrow
screenshots.

Nothing here draws UI. Every output is a crop of a captured frame of the running
application (see DENTGROW_SCREENSHOTS.md), resampled into the slot it occupies so
the layout is untouched. This file is the provenance of those images: the boxes
below record exactly which region of which screen each one came from.

Source frames are 2880x1800 (1440x900 at deviceScaleFactor 2).

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
    im = Image.open(src).convert("RGB")
    im = im.crop(box).resize(size, Image.LANCZOS)

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
    out = Image.alpha_composite(out, border)
    out.save(os.path.join(OUT, name), optimize=True)
    print(name, out.size)


# The full-bleed desktop banners are NOT generated here. Each slot renders with
# `object-fit: cover` and `object-position: left top`, which crops the source to
# exactly the same framing a pre-cropped file would have had — so the sections
# point straight at dentgrow-main-workspace.png / -clinical-workflow.png /
# -business-brain.png rather than carrying a second copy of the same pixels.

# ── Mobile banners: portrait crops of the same frames ────────────────────────
# Written at the crop's native resolution rather than at the CSS slot size. The
# slot uses `fill`, so intrinsic pixels do not affect layout at all — but the
# banner is still ~690px wide at the 768px breakpoint, and a 342px-wide file
# would be upscaled to twice its size there and go visibly soft. Opaque, not
# rounded: the container already rounds the corners, and a rounded PNG under a
# `cover` scale would round twice at the wrong radius.
panel(WORKSPACE, (497, 150, 1656, 1438), (1026, 1140), "workspace_banner_mobile.png", transparent=False)
panel(CLINICAL, (497, 213, 1440, 1260), (943, 1047), "clinical_banner_mobile.png", transparent=False)
panel(BRAIN, (497, 213, 1656, 1699), (1159, 1486), "brain_banner_mobile.png", transparent=False)

# ── Offer-card illustrations ─────────────────────────────────────────────────
# Live queue widget — the front desk's view of who is in the building.
panel(WORKSPACE, (2045, 943, 2844, 1364), (448, 236), "offer_queue.png")
# The patient record: who they are, when they were last seen, what they owe.
panel(CLINICAL, (497, 213, 1440, 739), (409, 228), "offer_patient.png")
# The dental chart's upper and lower arch.
panel(CLINICAL, (526, 1253, 1742, 1750), (362, 148), "offer_chart.png")
# The day's takings, as the dashboard reports them.
panel(WORKSPACE, (1094, 612, 1656, 976), (293, 190), "offer_revenue.png")

# ── Intro section's three fanned panels ──────────────────────────────────────
# Centre (portrait): the navigation itself — every part of the clinic in one rail.
panel(WORKSPACE, (0, 0, 430, 680), (222, 351), "panel_centre.png", radius=12)
# Left (landscape): today's numbers.
panel(WORKSPACE, (511, 202, 1656, 929), (350, 222), "panel_left.png", radius=12)
# Right (landscape): today's list of patients.
panel(WORKSPACE, (511, 943, 2030, 1779), (711, 391), "panel_right.png", radius=12)

print("done")
