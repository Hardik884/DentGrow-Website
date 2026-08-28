'use client';
import { styled } from 'styled-components';

/**
 * 11.25rem was tuned for the gap after FinancialFuture's own banner
 * screenshot, when this section followed it directly. SimplicitySection now
 * sits in between and already carries its own 6rem (4rem mobile) of bottom
 * padding, so that full margin was stacking on top of it — over 17rem of
 * empty space between two sections with nothing in it. A small top margin
 * here is enough on top of Simplicity's own padding.
 */
export const Wrapper = styled.section`
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto 8.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 6rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 56rem;
  margin: 0 auto 7.75rem;
  text-align: center;

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

export const BannerCtn = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  position: relative;
  width: 100%;
  height: 38.4375rem;
  overflow: hidden;
  border-radius: 0.75rem;

  img {
    border-radius: 0.75rem;
    object-fit: cover;
    /* A screenshot, not a photograph: anchor the crop so the patient record
       above the chart survives narrower viewports. */
    object-position: left top;
  }

  @media (max-width: 768px) {
    height: auto;
  }

  /* A screenshot cropped to a phone-shaped slot has to stop somewhere, and it
     will not always be on a row boundary. Fading the last few pixels into the
     page means the cut reads as the panel continuing rather than as a broken
     image. Mobile only: the desktop banners are wide enough to end cleanly. */
  @media (max-width: 768px) {
    &::after {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      bottom: 0;
      height: 3.5rem;
      background: linear-gradient(
        180deg,
        rgba(7, 6, 6, 0) 0%,
        var(--Background, #070606) 100%
      );
      pointer-events: none;
      z-index: 2;
    }
  }
`;

export const Edges = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Edge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;

  p {
    max-width: 26rem;
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }
`;

export const Title = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

/**
 * The jade statement between the clinical section and the briefing.
 *
 * It is a transition, not a destination. At 8rem over 8.25rem of padding it
 * ran to roughly a full viewport of solid green with giant type sitting in it,
 * which reads as a page that has stopped loading rather than as a beat between
 * two sections. Same colour, same statement, same full-bleed treatment — about
 * 40% of the height, so it passes at speed instead of parking.
 */
export const BriefNote = styled.div`
  padding: 5rem 4.5rem;
  background: var(--jade);

  /*
   * White, where the old bright green carried near-black type. Jade is a dark
   * surface: black on it is 3.14:1, which fails even the large-text threshold
   * by a hair, while white is 6.45:1. The type is unchanged in every other
   * respect.
   */
  p {
    color: var(--white);
    font-size: 5rem;
    font-weight: 400;
    line-height: 1.15;
    max-width: 1440px;
  }

  @media (max-width: 1024px) {
    padding: 4rem 3rem;

    p {
      font-size: 3.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;

    p {
      font-size: 2.25rem;
    }
  }
`;
