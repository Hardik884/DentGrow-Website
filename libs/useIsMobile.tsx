'use client';
import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Whether the viewport is at or below the mobile breakpoint.
 *
 * Deliberately starts as `false` on both the server and the client's first
 * render. Reading `window.innerWidth` during the initial state meant the server
 * rendered the desktop copy and the client immediately rendered the mobile
 * copy, so every section's text disagreed with the server HTML and React tore
 * down and re-rendered the whole tree on load. Committing to the desktop value
 * for one render and correcting it in an effect keeps hydration clean — and the
 * correction lands while the loading screen is still covering the page, so
 * nothing is ever seen switching.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const sync = () => setIsMobile(query.matches);

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isMobile;
};
