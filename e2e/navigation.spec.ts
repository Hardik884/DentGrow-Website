import { expect, test } from '@playwright/test';
import { waitForPageReady } from './helpers';

/**
 * Each nav link renders its label twice — once for the visible letters, once
 * in an `aria-hidden` layer used for the hover roll animation — so the
 * accessible name Chromium computes for it isn't a clean match on the label
 * text. The href is unique and stable, so links are targeted by that instead.
 */
test.describe('Header navigation', () => {
  test('desktop nav links scroll to their section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await waitForPageReady(page);

    const nav = page.getByTestId('site-nav');
    await expect(nav.locator('a[href="#product"]')).toBeVisible();
    await expect(nav.locator('a[href="#solutions"]')).toBeVisible();
    await expect(nav.locator('a[href="#security"]')).toBeVisible();

    await nav.locator('a[href="#security"]').click();
    await expect(page).toHaveURL(/#security$/);
    await expect(page.locator('#security')).toBeInViewport();
  });

  test('the header Book a Demo button opens the dialog', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    await page.getByTestId('book-demo-compact').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});

test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('opens, exposes the nav links, and closes after navigating', async ({
    page,
  }) => {
    await page.goto('/');

    const toggle = page.getByTestId('menu-toggle');
    const nav = page.getByTestId('site-nav');
    const productLink = nav.locator('a[href="#product"]');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(productLink).not.toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(productLink).toBeVisible();

    await productLink.click();
    await expect(page).toHaveURL(/#product$/);
    // The panel closes itself once a link inside it navigates.
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('the mobile Book a Demo button opens the dialog', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('menu-toggle').click();
    await page.getByTestId('book-demo-compact').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
