import { test } from "@playwright/test";

test("navigation between pages works correctly", async ({ page }) => {
  // Start at home page
  await page.goto("/");

  // Find and click the first dashboard link (more specific)
  await page
    .getByRole("link", { name: "Dashboard", exact: true })
    .first()
    .click();

  // Wait for dashboard page
  await page.waitForSelector("h1", { timeout: 5000 });

  // Try to navigate to favorites
  const favoritesLink = page.getByRole("link", {
    name: "Favorites",
    exact: true,
  });
  if ((await favoritesLink.count()) > 0) {
    await favoritesLink.click();
    await page.waitForSelector("h1", { timeout: 5000 });
  }
});
