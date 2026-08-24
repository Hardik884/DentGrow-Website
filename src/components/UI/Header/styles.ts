'use client';
import Link from 'next/link';
import { styled } from 'styled-components';
import {
  MENU_PANEL_WIDTH,
  MENU_PILL_HEIGHT,
  MENU_PILL_WIDTH,
} from './constants';

export const Wrapper = styled.section`
  padding: 1rem 0;
  border-bottom: 0.5px solid #3d3d3d;

  @media (max-width: 768px) {
    padding: 0.75rem 0;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* The containing block for the menu panel's contents below the breakpoint.
     The links and the button used to be positioned against the viewport, so
     where they landed inside the panel depended on how wide the phone was;
     against this row they keep the same place in the panel at every width. */
  position: relative;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const LogoContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

/**
 * The menu button, and the jade shape behind it.
 *
 * The button's box IS the closed pill: 3.4375rem x 2.5rem, the size the closed
 * variant animates to, with the icon centred in it by flex. It used to be
 * 0.5rem of padding around an inline image, which made the box 41x46 against a
 * 55x40 pill hung off its corner — the icon sat 3px right of the pill's centre
 * and the pill's right edge overhung the page gutter. Same pill, same size,
 * same radius; it is now concentric with what it sits behind.
 */
export const BurgerMenu = styled.div`
  display: none;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${MENU_PILL_WIDTH}px;
    height: ${MENU_PILL_HEIGHT}px;
    flex-shrink: 0;
    padding: 0;
    cursor: pointer;

    div {
      position: absolute;
      background: var(--jade);
      border-radius: 25px;
      z-index: 1;
    }

    img {
      /* \`display: block\` drops the inline baseline gap that was adding 5px
         below the icon and pushing it off the pill's vertical centre. */
      display: block;
      position: relative;
      z-index: 2;
      object-fit: cover;
    }
  }
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 3.75rem;
  position: relative;
  /* The row is space-between, so the nav only lands on the page's centre line
     when this margin cancels the difference between the logo and the CTA. It
     was -6.3rem for a narrow logo plus a Login link and a button; DentGrow's
     lockup is wider and the Login link is gone, so the correction flips sign.
     Measured, not guessed: it puts the nav's centre within a pixel of the
     content's centre at 1024, 1280, 1440 and 1920. */
  margin-right: 1.25rem;

  a {
    color: var(--link-color);
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    /* Laid over the open panel, which is MENU_PANEL_WIDTH wide and ends on
       this row's right edge — so the links take the panel's own width and are
       inset from its edges, rather than being pushed in from the viewport by a
       fixed number of pixels that only lined up on one phone. */
    position: absolute;
    top: 60px;
    right: 0;
    width: ${MENU_PANEL_WIDTH}px;
    padding: 0 1.75rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    margin-right: 0;
    z-index: 3;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.5s;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const AbsoluteLinks = styled(Link)`
  position: absolute;
  top: 40px;
  color: var(--link-color);
  font-size: 1rem;
  font-weight: 400;
`;

export const CallToActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  div {
    span {
      color: var(--white);
      font-size: 1rem;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    /* Same panel-width slot as the links above it. */
    position: absolute;
    top: 220px;
    right: 0;
    width: ${MENU_PANEL_WIDTH}px;
    padding: 0 1.75rem;
    justify-content: center;
    z-index: 3;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.5s;

    /*
     * Inverted, because on this breakpoint the button sits ON the jade menu
     * panel. A jade pill on a jade panel is 1:1 — the shape disappears and only
     * the label survives. The old palette got away with it on 2.3:1 between its
     * two greens; Deep Jade has no two steps far enough apart to carry a filled
     * button on a filled panel, so the button takes the panel's inverse here.
     * Shape, size, padding, radius and transition are untouched, and this is
     * scoped to the header: the hero and footer buttons sit on black at every
     * width and stay jade.
     */
    button {
      background: var(--white);
      color: var(--jade);
      /* The rest border is a light hairline meant for a jade fill; on white it
         would vanish, so the inverted button borrows the panel's own colour. */
      border-color: rgba(23, 107, 80, 0.16);
    }

    button:hover {
      background: var(--jade-tint);
      color: var(--jade-pressed);
      border-color: rgba(18, 84, 62, 0.22);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
    }

    button:active {
      background: var(--jade-tint);
      color: var(--jade-pressed);
    }

    /* The panel is jade, so the jade focus ring would disappear into it. */
    button:focus-visible {
      outline-color: var(--white);
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;
