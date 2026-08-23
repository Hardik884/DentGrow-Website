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
    /*
     * Centred in the card, at its own aspect.
     *
     * The row layout offsets and stretches individual shots to build its
     * composition; on a phone each card is on its own, so every screenshot is
     * framed the same way — full card width, the shot centred inside it, and
     * nothing reaching past an edge to be clipped.
     */
    margin: 0.32rem auto 0;
    width: 100%;
    max-width: 100%;
    justify-content: center;

    &::after {
      height: 1.75rem;
    }

    img {
      width: 90%;
      max-width: 90%;
      height: auto;
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
  }

  /*
   * The second row's composition: a narrow card and a wide one, each with its
   * screenshot pushed down the card and its copy sitting in the space that
   * leaves. The copy gets that slot from \`flex\` — a zero basis the row's free
   * space then grows back — which is only meaningful while this is a row.
   * Scoped above the phone breakpoint so the stacked layout below can size
   * every card to its own content instead.
   */
  @media (min-width: 769px) {
    &:last-child {
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
  }

  @media (max-width: 768px) {
    flex-direction: column;
    /* Cards take the column's full width rather than shrinking to fit their
       own contents, so all four are framed identically. */
    align-items: stretch;

    /*
     * Everything in the column sizes to what is inside it.
     *
     * This is what the missing copy was: stacked, the column has no free space
     * to hand back, so a \`flex: 1\` item is left on a zero basis. Chrome floors
     * it at min-content and it survives; other engines keep the basis, and the
     * heading and paragraph under each screenshot collapsed to nothing inside
     * the card's \`overflow: hidden\`. Neither the image nor the copy is a flex
     * slot here, so neither is sized like one.
     */
    ${ImageCtn},
    ${TextCtn} {
      flex: 0 0 auto;
      height: auto;
      margin-top: 0;
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

    /*
     * The narrow card's screenshot is deliberately shifted right and run past
     * the card's edge on the wide layout — the crop IS the composition there.
     * On a phone the card has no wide neighbour to lean against, so the same
     * offset only knocks the shot off centre and clips its right side, which
     * is what the patient record was doing. Kept for the row, dropped for the
     * column.
     */
    @media (min-width: 769px) {
      ${ImageCtn} {
        margin-left: 2.5rem;
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    /*
     * Height comes from the contents, not from the row's 31.25rem slot.
     *
     * Stacked, a card's screenshot and copy no longer share a fixed height
     * between them, so pinning the card to the row's height only decided how
     * much of the copy \`overflow: hidden\` would cut off.
     */
    height: auto;
    padding-bottom: 0.5rem;
  }
`;
