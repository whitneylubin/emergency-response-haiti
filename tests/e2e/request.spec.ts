import { test, expect } from '@playwright/test';

test('submit request flow', async ({ page }) => {
  await page.goto('/requests/new');
  await page.selectOption('select[name="type"]', 'FOOD');
  await page.fill('input[name="commune"]', 'Port-au-Prince');
  await page.fill('textarea[name="description"]', 'Need urgent assistance for families.');
  await page.fill('input[name="contactName"]', 'Playwright');
  await page.fill('input[name="contactPhone"]', '+50900000000');
  await page.check('input[type="checkbox"]');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Mèsi').first()).toBeVisible();
});
