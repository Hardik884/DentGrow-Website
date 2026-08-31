'use client';
import { MARK_SRC } from '@/components/Common/Logo/mark';
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

  /*
   * Both panels are decorative and aria-hidden; nothing in them is ever
   * interactive, so they have no business intercepting a click.
   *
   * This is load-bearing, not tidiness. Under prefers-reduced-motion the
   * panels leave by fading rather than by scaling away, which drops them to
   * opacity 0 while they are still full-viewport and on top of everything —
   * invisible, but swallowing every click on the page. The site was entirely
   * unusable for anyone who asks for reduced motion. Declaring it here fixes
   * both exit paths and does not depend on how the timeline animates them out.
   */
  pointer-events: none;
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
export const Mark = styled.span.withConfig({
  componentId: 'dg-preloader-mark',
})<{ $aspect: number }>`
  display: block;
  height: 1em;
  width: ${({ $aspect }) => $aspect}em;
  flex-shrink: 0;
  /* White, matching the header lockup — see Common/Logo/styles.ts for why
     the mark is no longer painted --jade. */
  background-color: var(--white);
  -webkit-mask-image: url('${MARK_SRC}');
  mask-image: url('${MARK_SRC}');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
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
