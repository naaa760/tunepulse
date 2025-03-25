import { test, expect } from "@playwright/test";

test("basic navigation test", async ({ page }) => {
  await page.goto("/");
  const title = page.locator("h1");
  await expect(title).toBeVisible();
});
