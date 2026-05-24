import { expect, test } from '@playwright/test';

const MINIMAL_URL = 'http://127.0.0.1:3000';
const PAYLOAD_ADMIN_URL = 'http://127.0.0.1:3001/admin';

test('minimal sandbox homepage loads', async ({ page }) => {
  const response = await page.goto(MINIMAL_URL);
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { name: /Boilerplate v2 Works/i })).toBeVisible();
});

test('Studio Dark shield theme is applied on minimal sandbox', async ({ page }) => {
  await page.goto(MINIMAL_URL);
  const shield = page.locator('body.msc-viewport-shield');
  await expect(shield).toBeVisible();
  const backgroundColor = await shield.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(backgroundColor).toBe('rgb(18, 18, 18)');
});

test('Payload admin route is accessible on full-stack sandbox', async ({ page }) => {
  const response = await page.goto(PAYLOAD_ADMIN_URL);
  expect(response).not.toBeNull();
  expect(response?.status()).toBeLessThan(500);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByRole('textbox').first()).toBeVisible({ timeout: 30_000 });
});
