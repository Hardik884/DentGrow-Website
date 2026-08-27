import { expect, test } from '@playwright/test';

const openDialog = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await page.getByTestId('book-demo-large').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return dialog;
};

test.describe('Book a Demo dialog', () => {
  test('opens from the hero CTA and mentions the clinic', async ({ page }) => {
    const dialog = await openDialog(page);
    await expect(dialog.getByRole('heading', { name: 'Book a demo' })).toBeVisible();
    await expect(dialog).toContainText('OraMedha');
  });

  test('closes on the close button, and Escape', async ({ page }) => {
    const dialog = await openDialog(page);
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();

    await openDialog(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('validates required fields before submitting', async ({ page }) => {
    const dialog = await openDialog(page);
    await dialog.getByRole('button', { name: 'Request a demo' }).click();

    await expect(dialog.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
    await expect(dialog.getByLabel('Mobile number')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    await expect(dialog.getByLabel('Email address')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  test('submits successfully and shows the confirmation state', async ({
    page,
  }) => {
    await page.route('**/api/demo-request', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    const dialog = await openDialog(page);
    await dialog.getByLabel('Name').fill('Dr. Test Patient');
    await dialog.getByLabel('Mobile number').fill('+91 80 4718 2200');
    await dialog.getByLabel('Email address').fill('demo@oramedha.test');

    await dialog.getByRole('button', { name: 'Request a demo' }).click();

    await expect(dialog.getByRole('heading', { name: 'Request received' })).toBeVisible();
    // Two "Close" buttons exist once the success state is showing (the panel's
    // own × and the success state's own button); the success state's is last.
    await dialog.getByRole('button', { name: 'Close' }).last().click();
    await expect(dialog).toBeHidden();
  });

  test('shows an error state when the request fails', async ({ page }) => {
    await page.route('**/api/demo-request', async (route) => {
      await route.fulfill({ status: 503, body: '{}' });
    });

    const dialog = await openDialog(page);
    await dialog.getByLabel('Name').fill('Dr. Test Patient');
    await dialog.getByLabel('Mobile number').fill('+91 80 4718 2200');
    await dialog.getByLabel('Email address').fill('demo@oramedha.test');
    await dialog.getByRole('button', { name: 'Request a demo' }).click();

    await expect(dialog.getByRole('alert')).toContainText('send that just now');
  });
});
