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
 * The Operations showcase: the day's appointments, and nothing else.
 *
 * This replaced a hover-driven fan — three panels folded flat behind one
 * another, unfolding on hover of the centre card. Two problems with it. It was
 * hover-only, so it never opened on a touch device at all; and neither the
 * left panel nor the centre one carried any size of its own, so each rendered
 * at its source file's intrinsic pixels — the navigation rail came out
 * 445x1000 and sat squarely on top of the section's own heading, which read
 * only as "Le ... os".
 *
 * A figures tile and a navigation tile briefly sat under the schedule as a
 * supporting pair. They were dropped: neither showed anything the three points
 * of copy below the section do not already say, and two small screenshots
 * competing under one large one is a busier composition than the section needs.
 */
export const Showcase = styled(motion.div)`
  width: 100%;
  /*
   * Full width, matching the dashboard banner at the top of the page.
   *
   * This used to stop at 44rem so the panel read as a preview inside the section
   * rather than as the section itself. But that ceiling also shrank a whole
   * application screen into 704px, which put its text on screen at roughly half
   * size and made the panel the least legible thing on the page. Showing the
   * appointments screen at banner width is the same trade the hero already makes,
   * and it is the screen this section's copy is actually about.
   */
  max-width: 100%;
  margin: 0 auto 7.77rem;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 4.5rem;
  }
`;

/**
 * The panel the screenshot is framed in — the page's own surface: #131313
 * behind a hairline, with the shot's corners following the frame's. Rendered
 * at the image's own aspect, so nothing is cropped and nothing is stretched.
 */
export const PrimaryPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  background: #131313;
  width: 100%;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
