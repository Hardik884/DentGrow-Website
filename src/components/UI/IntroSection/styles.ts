'use client';
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
 * The banner frame, deliberately identical to the two screenshots above it.
 *
 * 35rem is Featured's height, not FinancialFreedom's 38.4375rem: this is the
 * first screenshot on the page repeated, and the taller frame made the section
 * run long without showing more of the screen — the crop is anchored top-left,
 * so extra height only adds rows nobody reads at banner scale.
 *
 * The height itself lives on the shared `Div` from Featured/styles, which this
 * wraps; everything here is the frame around it.
 */
export const BannerCtn = styled.div`
  position: relative;
  width: 100%;
  max-width: 85rem;
  margin: 0 auto 7.77rem;
  overflow: hidden;
  border-radius: 0.75rem;

  img {
    border-radius: 0.75rem;
    object-fit: cover;
    /* A screenshot, not a photograph: anchor the crop top-left so the
       product's navigation and page header stay in frame at every width. */
    object-position: left top;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    margin-bottom: 4.5rem;

    img {
      border-radius: 0.5rem;
    }
  }
`;
