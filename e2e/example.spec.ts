/**
 * Example Playwright E2E test
 *
 * To run:
 * pnpm add -D @playwright/test
 * npx playwright install
 * pnpm e2e
 */
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/React Web Template/);
  });

  test('displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /React Web Template/i })).toBeVisible();
  });

  test('navigates to form page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Try Form Example');
    await expect(page).toHaveURL('/form');
    await expect(page.getByRole('heading', { name: /Form Example/i })).toBeVisible();
  });
});

test.describe('Form Page', () => {
  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/form');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/Name must be at least 2 characters/i)).toBeVisible();
  });

  test('submits form successfully with valid data', async ({ page }) => {
    await page.goto('/form');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="confirmPassword"]', 'Password123');
    await page.check('input[name="terms"]');

    await page.click('button[type="submit"]');
    await expect(page.getByText(/Form Submitted Successfully/i)).toBeVisible();
  });
});
