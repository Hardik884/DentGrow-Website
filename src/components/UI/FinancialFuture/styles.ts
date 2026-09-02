'use client';
import { styled } from 'styled-components';
import card_grid from '../../../../public/images/card_grid.png';

export const Wrapper = styled.section`
  padding-top: 7.75rem;
`;

export const Inner = styled.div`
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
  margin: 0 auto 6.25rem;

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

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Card = styled.div`
  height: 41.875rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  background: #131313;

  @media (max-width: 768px) {
    height: 27.5rem;
  }
`;

export const TextCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 32.25rem;
  margin: 3.25rem 3.25rem 2.94rem 3.25rem;

  h3 {
    font-size: 2rem;
    font-weight: 500;
    /* Same clipping bug as OffersSection's h2 — see the note there. 1.75rem gave
       28px of line box to a 32px glyph inside a MaskText LineMask that is
       overflow:hidden, so descenders were cut, not merely crowded. */
    line-height: 1.2;
  }

  p {
    color: var(--link-color);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.75rem;
  }

  @media (max-width: 768px) {
    margin: 1.5rem 1.5rem 1.75rem 1.5rem;

    h3 {
      font-size: 1.5rem;
      line-height: 1.2;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const SVGCtn = styled.div`
  background: url(${card_grid.src});
  height: 24.55rem;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;

  /* Holds a crop of the real briefing now, not a 24px glyph. It floats on the
     grid at its own aspect and never grows past the slot, so the card's height
     is unchanged. */
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 21rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 768px) {
    height: 15.28219rem;
    background-position: center center;
    background-size: contain;
    padding: 0 1rem;

    img {
      max-height: 12rem;
    }
  }
`;

export const Stats = styled.div`
  margin: 6.25rem auto 2.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 3.75rem auto;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  h1 {
    font-size: 5rem;
    font-weight: 600;
  }

  p {
    color: var(--link-color);
    font-size: 1.125rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;

// export const Number = styled.h1`
//   font-size: 5rem;
//   font-weight: 600;
// `;

// export const SubTitle = styled.p`
//   color: var(--link-color);
//   font-size: 1.125rem;
//   font-weight: 500;
//   text-transform: uppercase;
// `;

/**
 * The briefing screenshot.
 *
 * It used to run the full width of the viewport at 45rem tall, which read as
 * the application taking the page over rather than as another product shot.
 * These are the dashboard banner's dimensions instead — same 90% width, same
 * 1440px ceiling, same 35rem height and same corner radius — so the two
 * screenshots carry the same weight on the page.
 */
/**
 * The five areas, under the row that counts them.
 *
 * A hairline above groups the two into one block, so the pills read as the
 * enumeration of the "5" rather than as a stray row of tags. Same pill shape as
 * the hero's, one step quieter.
 */
export const Areas = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  max-width: 1440px;
  margin: 0 auto 6.25rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 3.75rem;
    padding-top: 2rem;
  }
`;

export const Area = styled.span`
  padding: 0.5rem 1.125rem;
  border-radius: 6.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--link-color);
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.875rem;
  }
`;

export const Banner = styled.div`
  position: relative;
  width: 90%;
  max-width: 1440px;
  height: 35rem;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.75rem;

  img {
    object-fit: cover;
    /* A screenshot, not a photograph: anchor the crop to the top-left so the
       briefing's health score and first cards stay in frame at every width. */
    object-position: left top;
    border-radius: 0.75rem;
  }

  @media (max-width: 768px) {
    height: 23.75rem;
    border-radius: 0.5rem;
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
