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
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 6.75rem;

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
 * The slot the product preview sits in.
 *
 * Takes whatever height the copy below it doesn't, and centres the screenshot
 * inside that with padding on every side, so the preview always sits *within*
 * the card rather than filling it. `min-height: 0` is what lets it actually
 * shrink in the flex column — without it a flex item is floored at its
 * content's own height and the screenshot pushes the copy out of the card.
 */
export const ImageCtn = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2.5rem 0;

  img {
    /*
     * A deliberate maximum, not a plain width: 100%.
     *
     * These are real application screenshots 2400–2850px wide. Told to fill
     * the card they became the card: the billing shot ran to 840x636 inside a
     * 500px-tall box, bled past the edge and pushed its own heading out of
     * frame. Capping BOTH axes instead — and letting object-fit pick whichever
     * binds first — lands every preview at the same visual weight in the wide
     * cards and the narrow ones, at its own aspect, never touching the copy.
     *
     * The four sources are cropped to a common ~1.45 aspect, so the four
     * previews come out within a few pixels of each other in height.
     */
    width: auto;
    height: auto;
    max-width: 100%;
    /* Both bounds matter. The rem is the deliberate ceiling; the 100% keeps
       the preview inside its slot when the slot is the shorter of the two,
       without which the image simply overflows the card and rides over the
       heading below it. */
    max-height: min(17rem, 100%);
    object-fit: contain;
    border-radius: 0.5rem;
  }

  @media (max-width: 1024px) {
    padding: 2rem 2rem 0;

    img {
      max-height: min(14rem, 100%);
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
    padding: 1.5rem 1.5rem 0;

    /*
     * No height ceiling here, deliberately.
     *
     * Stacked, the card sizes to its contents, so this slot has no definite
     * height for a percentage to resolve against — a \`min(13rem, 100%)\` here
     * silently resolved to no cap at all. The card's own width is the bound
     * instead, which is also the more consistent rule: every preview then sits
     * at the same fraction of its card at 390px as at 768px. All four sources
     * are ~1.45 wide, so a width-bound height stays modest.
     */
    img {
      max-height: none;
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
  /* Never the slot that gives, only the image above it. Without this a flex
     item shrinks below its content size once the row runs short on room,
     which is what let the card's fixed height clip the copy in the first
     place. */
  flex-shrink: 0;

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
   * The second row mirrors the first: narrow card, then wide. Nothing else.
   *
   * It used to also push each screenshot 5.7rem down its card and hand the
   * copy a \`flex: 1\` slot on a zero basis — a composition built for
   * transparent illustrations that could bleed past an edge. With a real
   * screenshot in the slot the image took the whole card and the copy was left
   * with \`height: 1em\`, so the heading sat on the card's bottom edge and the
   * paragraph was cut off by \`overflow: hidden\`.
   *
   * Both rules are also scoped to direct children now. As plain descendant
   * selectors, \`div:first-child\` matched the image slot inside each card and
   * \`div:last-child\` the copy under it, so the copy quietly picked up
   * \`flex: 2\` and grew, squeezing the slot above it. These two rules are about
   * the cards in the row, not anything inside them.
   */
  @media (min-width: 769px) {
    &:last-child {
      > div:first-child {
        flex: 1;
      }

      > div:last-child {
        flex: 2;
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
  /*
   * A floor, not a fixed size. \`height\` pinned every card to exactly 500px
   * regardless of what the copy inside needed — the image slot (\`flex: 1;
   * min-height: 0\`) shrinks to make room for the text, but the text slot
   * (\`TextCtn\`) has no such protection and, past a certain content length,
   * shrank below its own line height and lost lines to this \`overflow:
   * hidden\`, the Billing card among them. \`min-height\` keeps every card at
   * today's 500px whenever the content already fits it — which is every card
   * today, so nothing here changes what renders — and lets the card grow
   * past it instead of clipping if the content ever needs more.
   */
  min-height: 31.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  display: flex;
  flex-direction: column;
  background: url(${grid_background.src}) #131313 no-repeat;

  &:first-child {
    flex: 2;
  }

  /*
   * The narrow card's screenshot used to be shifted 2.5rem right and given
   * \`width: 100%\` so it ran deliberately past the card's edge — again, a
   * treatment for artwork rather than for a screenshot, and with a real one
   * in the slot it simply clipped the right-hand side of the patient record.
   * Centred inside the card like the other three now.
   */
  &:nth-child(2) {
    flex: 1;
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
    min-height: 0;
    padding-bottom: 0.5rem;
  }
`;
