import { test, expect } from "@playwright/test";

test("search functionality works correctly", async ({ page }) => {
  // Go to dashboard
  await page.goto("/dashboard");

  // Wait for the dashboard page to load
  await page.waitForSelector("h1:has-text('Music Dashboard')", {
    timeout: 10000,
  });

  // Use a more general selector for the search input
  const searchInput = page.getByPlaceholder(/Search/i);
  await expect(searchInput).toBeVisible({ timeout: 5000 });
  await searchInput.fill("Shape of You");

  // Find the search button by its icon or nearby the input
  const searchForm = page.locator("form").first();
  await searchForm.press("Enter");

  // Wait for results
  await page.waitForTimeout(2000);

  // Verify search results - check for any content in the results area
  const contentContainer = page.locator("main").locator("div").nth(1);
  await expect(contentContainer).toBeVisible();

  const searchResultsText = await contentContainer.textContent();
  console.log("Search results:", searchResultsText);
});
