'use client';
import { styled } from 'styled-components';

/**
 * Both panels are pinned to the viewport and centre their contents. `100dvh`
 * keeps the lockup optically centred on mobile, where a `100vh` panel sits
 * partly behind the browser's own chrome; `100vh` stays as the fallback.
 */
const panel = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
`;

export const Wrapper = styled.div`
  ${panel}
  z-index: 9999;
  background: var(--Background);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * The lockup's font-size is the mark's height; everything inside is in `em`,
 * so the whole thing scales from one number at each breakpoint.
 */
export const Lockup = styled.div.withConfig({ componentId: 'dg-preloader-lockup' })`
  display: flex;
  align-items: center;
  gap: 0.32em;
  line-height: 1;
  font-size: 88px;

  @media (max-width: 1024px) {
    font-size: 72px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 380px) {
    font-size: 40px;
  }
`;

/* Pinned for the same reason as the header lockup's mark — see
   Common/Logo/styles.ts. */
export const Mark = styled.svg.withConfig({
  componentId: 'dg-preloader-mark',
})<{ $aspect: number }>`
  height: 1em;
  width: ${({ $aspect }) => $aspect}em;
  fill: var(--jade);
  flex-shrink: 0;
`;

/* The mask the letters rise out of. Its padding gives descenders room without
   letting a letter's travel show above the cap line. */
export const WordMask = styled.div.withConfig({ componentId: 'dg-preloader-mask' })`
  display: flex;
  overflow: hidden;
  padding-bottom: 0.08em;
`;

export const Letter = styled.span.withConfig({ componentId: 'dg-preloader-letter' })`
  display: block;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.1;
  white-space: pre;
`;

export const SecondOverlay = styled.div`
  ${panel}
  z-index: 9990;
  background: var(--jade);
`;
