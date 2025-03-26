import { Page, expect } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");
}

export async function waitForApiCall(page: Page, urlPattern: string) {
  return page.waitForResponse(urlPattern);
}

export async function cleanupTestData(page: Page) {}

/**
 * Helper function to handle Next.js client-side navigation
 * that verifies navigation by checking content rather than URL
 */
export async function navigateAndVerifyContent(
  page: Page,
  clickSelector: string,
  targetContentSelector: string
) {
  const element = page.locator(clickSelector).first();

  // Click and wait
  await element.click();
  await page.waitForTimeout(1000);

  // Verify content changed
  const targetElement = page.locator(targetContentSelector);
  await expect(targetElement).toBeVisible();

  return true;
}

/**
 * Helper function to handle Next.js client-side navigation
 */
export async function navigateAndWait(page: Page, clickSelector: string) {
  const element = page.locator(clickSelector).first();

  // Click and wait - simpler approach that doesn't rely on navigation events
  await element.click();
  await page.waitForTimeout(1000);

  return page.url();
}
