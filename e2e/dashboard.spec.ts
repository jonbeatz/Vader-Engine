import { expect, test } from '@playwright/test';

const DASHBOARD_URL = 'http://127.0.0.1:3010';

const NAV_ROUTES = [
  { testId: 'nav-projects', path: '/projects', title: 'Projects' },
  { testId: 'nav-templates', path: '/templates', title: 'Templates' },
  { testId: 'nav-sandboxes', path: '/sandboxes', title: 'Sandboxes' },
  { testId: 'nav-integrity', path: '/integrity', title: 'Structural integrity' },
  { testId: 'nav-operations', path: '/operations', title: 'Operations' },
  { testId: 'nav-settings', path: '/settings', title: 'Settings' },
] as const;

test.describe('Vader Construct dashboard', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto(DASHBOARD_URL);
    expect(response?.ok()).toBeTruthy();
  });

  test('dashboard loads with heading and metric cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
    await expect(page.getByText('Vader Velocity', { exact: true })).toBeVisible();
    await expect(page.getByText('Engine Capacity', { exact: true })).toBeVisible();
    await expect(page.getByText('Integrity Score', { exact: true })).toBeVisible();
  });

  test('sidebar navigation loads each core route', async ({ page }) => {
    for (const route of NAV_ROUTES) {
      const responsePromise = page.waitForResponse(
        (res) => res.url().includes(route.path) && res.request().method() === 'GET',
      );
      await page.getByTestId(route.testId).click();
      const response = await responsePromise;
      expect(response.ok()).toBeTruthy();
      await expect(page).toHaveURL(new RegExp(`${route.path.replace('/', '\\/')}$`));
      await expect(page.getByText(route.title, { exact: true }).first()).toBeVisible();
    }
  });

  test('command palette opens on / and accepts search input', async ({ page }) => {
    await page.locator('main').click();
    await page.keyboard.press('/');
    await expect(page.getByTestId('command-palette')).toBeVisible();
    const search = page.getByPlaceholder('Search commands…');
    await expect(search).toBeVisible();
    await search.fill('dashboard');
    await expect(search).toHaveValue('dashboard');
  });
});
