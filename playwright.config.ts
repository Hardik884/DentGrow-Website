import { defineConfig, devices } from '@playwright/test';

/**
 * E2E coverage for the marketing site.
 *
 * Runs against `next dev` on a dedicated port so a developer's own dev server
 * (if one is already up on 3000) is never hijacked or torn down by the test
 * run. CI reuses nothing; a local run reuses a server already started on that
 * port, so `npm run test:e2e` stays fast on repeat runs.
 */
const PORT = process.env.PLAYWRIGHT_PORT ?? '3100';
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30_000,
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
