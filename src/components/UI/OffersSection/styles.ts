'use client';
import { styled } from 'styled-components';
import grid_background from '../../../../public/images/offer_card_grid_1.png';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 12.38rem auto 0;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 6.75rem;

  h1 {
    font-size: 4.75rem;
    font-weight: 400;
  }

  p {
    max-width: 41.75rem;
    color: #989898;
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

export const ImageCtn = styled.div`
  margin: 3rem auto 0;
  position: relative;
  display: flex;

  /*
   * A short vignette at the very bottom edge only.
   *
   * This was a 13.4rem gradient starting 50px down, which is what you want
   * behind a transparent illustration: it melts the artwork into the card.
   * These slots hold opaque product screenshots now, and that gradient laid a
   * grey veil over the bottom two thirds of every one of them — the shots read
   * as dissolving rather than as crisp product. Kept as a thin fade so the
   * cropped edge still settles into the card instead of stopping dead.
   */
  &::after {
    position: absolute;
    content: '';
    height: 2.5rem;
    width: 100%;
    background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, #131313 100%);
    left: 0;
    bottom: 0;
    pointer-events: none;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    margin: 0.32rem auto 0;

    &::after {
      height: 1.75rem;
    }

    img {
      width: 90%;
      margin: 0 auto;
      object-fit: contain;
    }
  }
`;

export const TextCtn = styled.div`
  padding: 2.5rem;
  padding-top: 3.25rem;
  max-width: 32.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  p {
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const Offers = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  &:last-child {
    margin-top: 2rem;

    div:first-child {
      flex: 1;

      ${ImageCtn} {
        margin-top: 5.7rem;
        flex: 2;
      }

      ${TextCtn} {
        height: 1em;
        flex: 1;
      }
    }

    div:last-child {
      flex: 2;

      ${ImageCtn} {
        margin-top: 5.7rem;
        flex: 2;
        margin-left: auto;
      }

      ${TextCtn} {
        height: 1em;
        flex: 1;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    &:last-child {
      div:first-child {
        flex: 1;

        ${ImageCtn} {
          margin-top: 4.78rem;
          flex: 1;
        }

        ${TextCtn} {
          margin-top: 4rem;
        }
      }

      div:last-child {
        flex: 1;

        ${ImageCtn} {
          margin-top: 5.7rem;
          flex: 1;
          margin-left: auto;
        }

        ${TextCtn} {
          margin-top: 2rem;
        }
      }
    }
  }
`;

export const OfferCard = styled.div`
  overflow: hidden;
  height: 31.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  display: flex;
  flex-direction: column;
  background: url(${grid_background.src}) #131313 no-repeat;

  &:first-child {
    flex: 2;
  }

  &:nth-child(2) {
    flex: 1;

    ${ImageCtn} {
      margin-left: 2.5rem;
      width: 100%;
    }
  }
`;
