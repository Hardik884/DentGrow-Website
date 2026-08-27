import type { ConsoleMessage, Page } from '@playwright/test';

/**
 * Collects console errors for the lifetime of the page.
 *
 * Next.js dev overlay logs `[Fast Refresh]` info as `console.log`, not
 * `console.error`, so this only has to filter the one known, unrelated
 * warning already present on this page (a styled-components SSR/CSR
 * className mismatch on the header, tracked separately from this suite) —
 * everything else is a real regression.
 */
export const trackConsoleErrors = (page: Page) => {
  const errors: string[] = [];
  const onConsole = (message: ConsoleMessage) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (text.includes('did not match. Server:')) return; // known SSR hydration warning, unrelated to content
    errors.push(text);
  };
  page.on('console', onConsole);
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
};

/** True when the document is wider than its own viewport — a layout bug. */
export const hasHorizontalOverflow = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );

/**
 * Waits out the loading screen.
 *
 * The whole page is `display: none` under a `.not_complete` wrapper class
 * (see Layout/GlobalStyles) until the preloader animation finishes and flips
 * it to `.complete` — by design, so nothing is ever seen reflowing under the
 * green wipe. Lenis measures the scrollable height once that happens, and
 * that measurement lags the class flip by a beat, so anything that scrolls
 * the page (a nav click, a hash link) needs the extra buffer below or it
 * clicks a real, visible link whose scroll silently clamps to nothing.
 */
export const waitForPageReady = async (page: Page) => {
  await page.waitForSelector('.complete', { state: 'attached', timeout: 10_000 });
  await page.waitForTimeout(500);
};
