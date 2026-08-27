'use client';
import Image from 'next/image';
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
 * The desktop fan. Rendered only above the breakpoint — see MobilePanels below
 * for what a phone gets instead — so everything in here is free to assume a
 * pointer and a wide row.
 */
export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 7.77rem;
  width: 100%;
`;

export const LeftImage = styled(Image)`
  /* Folded flat behind the centre card until it is hovered, as designed.
     A resting offset was tried so the fan would advertise itself, and backed
     out: these panels are screenshots, and a screenshot standing on its side
     reads as broken UI rather than as the edge of a stacked card. */
  transform: rotate(270deg);
  position: absolute;
  top: 64px;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(70.281deg) translate(-50%, 60%);
    top: 60%;
  }
`;

export const MiddleImage = styled(Image)`
  position: relative;
  z-index: 3;
  cursor: pointer;
`;

export const RightImage = styled(Image)`
  width: 21.875rem;
  height: 13.875rem;
  /* This box is LeftImage's own footprint (350x222), reused here so the
     folded fan is symmetric — but the source behind it, panel_right, is a
     wider 711x391 shot. Without object-fit the browser stretches it to
     match the box, squeezing the appointments list horizontally. Cropping
     it instead keeps the same box, so the fold and the open fan's geometry
     are untouched, and anchoring top-left keeps the list's own header in
     frame. */
  object-fit: cover;
  object-position: left top;
  transform: rotate(90deg);
  top: 65px;
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(-70.281deg) translate(50%, 60%);
    top: 60%;
  }
`;

/**
 * What a phone gets in place of the fan.
 *
 * The fan is a hover interaction — the outer panels sit folded behind the
 * centre one until the centre is hovered — and touch has no hover, so the phone
 * layout used to unfold it into three full-width screenshots in a column. Every
 * panel was visible, but at equal weight and nearly a thousand pixels of
 * scroll: three screenshots in a list rather than a composition.
 *
 * One panel leads instead and the other two sit under it as a compact pair, so
 * the section reads the way the fan does — a main view with its supporting
 * panels around it — in about a third of the height. Same three panels, same
 * card surface, same radius; only the arrangement is different.
 */
export const MobilePanels = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* The pair sizes itself from its own aspect rather than being stretched to
       whatever the taller of the two would be. */
    align-items: start;
    gap: 0.75rem;
    width: 100%;
    margin-bottom: 4.5rem;
  }
`;

/* The card surface the panels are framed in — the page's own: #131313 behind a
   hairline, with the screenshot's corners following the frame's. */
const panelFrame = `
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(255, 255, 255, 0.04));
  background: #131313;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

export const PrimaryPanel = styled.div`
  ${panelFrame}
  grid-column: 1 / -1;
`;

/**
 * The two supporting panels, side by side under the lead.
 *
 * Each is a fixed, shared slot with the screenshot filling it from the top
 * left, so the pair reads as one row of cards rather than as two more
 * screenshots at two more sizes. The crop is deliberate: what is worth seeing
 * at this size — the day's figures, the top of the workflow list — is at the
 * top of both shots.
 */
export const SecondaryPanel = styled.div`
  ${panelFrame}
  /* The figures panel's own shape, so it lands in its slot uncropped at every
     width and the taller navigation shot is the only one the frame trims. */
  aspect-ratio: 350 / 222;

  img {
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  /* The same fade the page's other cropped screenshots end on, so a cut that
     does not land on a row boundary reads as the panel continuing. */
  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2rem;
    background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, #131313 100%);
    pointer-events: none;
  }
`;
