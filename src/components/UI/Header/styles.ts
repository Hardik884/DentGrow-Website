'use client';
import Link from 'next/link';
import { styled } from 'styled-components';

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

export const BurgerMenu = styled.div`
  display: none;
  position: relative;

  @media (max-width: 768px) {
    display: block;
    padding: 0.5rem;

    div {
      position: absolute;
      background: var(--jade);
      width: '250px';
      height: '300px';
      border-radius: 25px;
      z-index: 1;
      top: 50px;
    }

    img {
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
    position: absolute;
    top: 60px;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    right: 120px;
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
    position: absolute;
    top: 220px;
    z-index: 3;
    right: 50px;
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
    }

    button:hover {
      background: var(--jade-tint);
      color: var(--jade-pressed);
    }

    button:active {
      background: var(--jade-tint);
      color: var(--jade-pressed);
    }

    button:focus-visible {
      outline-color: var(--white);
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;
