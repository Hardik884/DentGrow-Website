'use client';
import { useLenis } from '@studio-freight/react-lenis';
import { useCallback } from 'react';

/** Ids of the homepage sections the navigation points at. */
export const SECTION_IDS = {
  product: 'product',
  solutions: 'solutions',
  security: 'security',
} as const;

/**
 * Scrolling the page is Lenis's job, not the browser's.
 *
 * A plain `href="#product"` would jump instantly and leave Lenis's internal
 * position out of step with the real scroll offset, which makes the next wheel
 * event snap. Handing the target to `lenis.scrollTo` keeps one scroller in
 * charge, so anchor navigation eases exactly like every other scroll on the
 * page — and the anchor still works with JavaScript disabled, because the
 * handler only takes over once Lenis and the target both exist.
 */
export const useScrollToSection = () => {
  const lenis = useLenis();

  return useCallback(
    (event: React.MouseEvent<HTMLElement>, href: string) => {
      if (!href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return; // leave the browser to its default behaviour

      event.preventDefault();
      scrollToTarget(lenis, target);

      // Keep the address bar honest without adding a history entry per click.
      window.history.replaceState(null, '', href);
    },
    [lenis]
  );
};

/** True when the visitor has asked the OS for less motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Move to a section. Falls back to the native scroll if Lenis has not mounted
 * yet, and jumps rather than eases when reduced motion is requested.
 */
export function scrollToTarget(lenis: any, target: Element) {
  const reduce = prefersReducedMotion();

  if (lenis?.scrollTo) {
    lenis.scrollTo(target, {
      offset: -24,
      duration: reduce ? 0 : 1.1,
      immediate: reduce,
    });
    return;
  }

  target.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  });
}
