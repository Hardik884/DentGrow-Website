'use client';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  padding-top: 7.5rem;

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 7.38rem;

  h3 {
    color: var(--jade-legible);
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: var(--link-color);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    /* The 7.38rem the wide layout leaves under this header is measured against
       a fan that is most of a screen tall. The phone composition below is a
       third of that, so the same gap reads as the section having stalled. */
    margin-bottom: 5rem;

    h1 {
      font-size: 2.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const HeaderMainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

/**
 * The Operations showcase.
 *
 * This replaced a hover-driven fan: three panels folded flat behind one
 * another, unfolding on hover of the centre card. Two problems with it. It was
 * hover-only, so it never opened on a touch device at all; and neither the
 * left panel nor the centre one carried any size of its own, so each rendered
 * at its source file's intrinsic pixels — the navigation rail came out
 * 445x1000 and sat squarely on top of the section's own heading, which read
 * only as "Le … os".
 *
 * What replaced it is a composed product shot, laid out the same way at every
 * width: the day's appointments leading at full width, the figures and the
 * navigation as a supporting pair beneath. One arrangement, three sizes.
 */
export const Showcase = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  /*
   * The deliberate ceiling. The composition is centred in a 1440px row and
   * stops well short of it, which is what keeps it reading as a preview of the
   * product inside the section rather than as the section itself.
   */
  max-width: 44rem;
  margin: 0 auto 7.77rem;

  @media (max-width: 1024px) {
    max-width: 34rem;
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 0.75rem;
    margin-bottom: 4.5rem;
  }
`;

/**
 * The supporting pair, centred beneath the lead panel.
 *
 * Capped rather than stretched to the full width. The navigation rail is a
 * 445px-wide crop of a 2x capture — the widest it exists at — so a slot much
 * past 15rem would be asking a 445px source to fill 720 device pixels and the
 * labels inside it would go soft. Capping the pair keeps both panels at their
 * own resolution and insets them under the lead, which reads as composed
 * rather than as a second full-width row.
 */
export const SecondaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 15rem));
  justify-content: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    /* On a phone the panels are already well under the cap, so they simply
       share the row. */
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`;

/* The card the screenshots are framed in — the page's own surface: #131313
   behind a hairline, with the shot's corners following the frame's. */
const panelFrame = `
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  background: #131313;
`;

/**
 * The lead panel: the day's appointments, across the full width of the
 * composition. Rendered at its own aspect, so nothing is cropped and nothing
 * is stretched. The shadow is the only depth cue — enough to sit it a layer
 * above the pair below without tilting or overlapping anything.
 */
export const PrimaryPanel = styled.div`
  ${panelFrame}
  width: 100%;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

/**
 * The two supporting panels, side by side under the lead.
 *
 * All three sources are cropped to this same 350/222 shape, so the frame's
 * cover is a no-op on every one of them: nothing is cropped at render time and
 * no figure is cut through the middle. The crop that got them there was
 * deliberate — the navigation rail is a tall strip and the figures are a wide
 * band, and neither would sit in a shared row at its own aspect.
 */
export const SecondaryPanel = styled.div`
  ${panelFrame}
  aspect-ratio: 350 / 222;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  /* The same fade the page's other cropped screenshots end on, so a cut that
     does not land on a row boundary reads as the panel continuing. */
  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2rem;
    background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, #131313 100%);
    pointer-events: none;
  }
`;
