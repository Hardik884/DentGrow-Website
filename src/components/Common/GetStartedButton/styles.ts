'use client';
import { styled, css } from 'styled-components';

export type CtaSize = 'compact' | 'default' | 'large';

/**
 * The three contexts this CTA appears in, sized deliberately rather than by an
 * arbitrary padding string passed per call site. Type scales with the button,
 * so the label keeps the same optical weight in the header rail as it does
 * under the hero.
 *
 * The gaps look small written down because the arrow's own viewBox carries
 * about 2.5px of empty space on its left at these sizes; the optical gap lands
 * a little under a space character, which is where it should sit.
 */
const SIZES: Record<CtaSize, ReturnType<typeof css>> = {
  compact: css`
    font-size: 0.875rem;
    padding: 0.5625rem 1rem;
    gap: 0.25rem;
  `,
  default: css`
    font-size: 0.9375rem;
    padding: 0.6875rem 1.25rem;
    gap: 0.3125rem;
  `,
  large: css`
    font-size: 1rem;
    padding: 0.875rem 1.625rem;
    gap: 0.375rem;
  `,
};

export const Trigger = styled.button<{ $size: CtaSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /*
   * A soft capsule, not a pill. The old 6.25rem radius rounded the ends
   * completely, which is the shape every default button component arrives
   * with; 0.625rem sits just inside the 0.75rem the cards, dialog and banners
   * use, so the button reads as part of the same family without becoming a
   * lozenge.
   */
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: var(--jade);
  color: var(--white);

  /*
   * 500, not 600. Six hundred is the heaviest weight on the page and is
   * otherwise reserved for the wordmark; at button size it reads as shouting.
   * Five hundred matches the section labels and sub-headings. The hair of
   * positive tracking counters SF Pro Display's display-tight metrics at this
   * size, and line-height 1 makes the vertical centring exact rather than
   * dependent on the inherited leading.
   */
  font-family: inherit;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1;
  white-space: nowrap;

  cursor: pointer;
  /* Matches the easing used by the text reveals and the dialog. */
  transition: background 0.22s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.22s cubic-bezier(0.33, 1, 0.68, 1),
    border-color 0.22s cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 0.22s cubic-bezier(0.33, 1, 0.68, 1);

  ${({ $size }) => SIZES[$size]}

  &:hover {
    background: var(--jade-hover);
    /* Two pixels. Enough to feel answered, not enough to notice as motion. */
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background: var(--jade-pressed);
    /* Down a pixel from rest, three from hover: a press, not a bounce. */
    transform: translateY(1px);
    box-shadow: none;
    /* The press should answer instantly; only the release eases back. */
    transition-duration: 0.09s;
  }

  &:focus-visible {
    outline: 2px solid var(--jade-hover);
    outline-offset: 3px;
  }

  /* A tap target the thumb can find, without changing how it looks anywhere
     the pointer is a mouse. */
  @media (max-width: 768px) {
    min-height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background 0.22s ease, border-color 0.22s ease;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

/**
 * The arrow. Inherits `currentColor` rather than carrying a fill, so it follows
 * the label into the inverted treatment the header uses on mobile.
 */
export const Arrow = styled.svg`
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  /* Optical, not geometric: centring the box leaves the arrow reading a touch
     low against a cap-height label. */
  margin-top: -0.045em;
  transition: transform 0.22s cubic-bezier(0.33, 1, 0.68, 1);

  ${Trigger}:hover & {
    transform: translateX(3px);
  }

  @media (prefers-reduced-motion: reduce) {
    ${Trigger}:hover & {
      transform: none;
    }
  }
`;
