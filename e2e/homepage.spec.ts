import { expect, test } from '@playwright/test';
import { hasHorizontalOverflow, trackConsoleErrors, waitForPageReady } from './helpers';

test.describe('Homepage', () => {
  test('loads with the right title and no console errors', async ({ page }) => {
    const errors = trackConsoleErrors(page);

    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle('OraMedha');

    // Every animated section mounts and settles before we call the page quiet.
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('hero renders the current tagline', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
    const hero = page.locator('h1', { hasText: 'Your entire clinic,' });
    await expect(hero).toBeVisible();
    await expect(
      page.getByText('intelligently connected.', { exact: false })
    ).toBeVisible();
  });

  test('never shows the retired brand name', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Visible copy only — internal asset paths (public/images/dentgrow/*)
    // are retained by design and legitimately appear in image `src` urls.
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).not.toContain('dentgrow');

    const altTexts = await page.locator('img[alt]').evaluateAll((imgs) =>
      imgs.map((img) => img.getAttribute('alt') ?? '')
    );
    for (const alt of altTexts) {
      expect(alt.toLowerCase()).not.toContain('dentgrow');
    }
  });

  test('has no horizontal overflow on desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });

  test('has no horizontal overflow on mobile widths', async ({ page }) => {
    for (const width of [375, 390, 430]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      expect(await hasHorizontalOverflow(page), `overflow at ${width}px`).toBe(false);
    }
  });
});
