import { Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");
}

export async function waitForApiCall(page: Page, urlPattern: string) {
  return page.waitForResponse(urlPattern);
}

export async function cleanupTestData(page: Page) {}
