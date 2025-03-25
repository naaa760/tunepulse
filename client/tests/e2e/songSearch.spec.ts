import { test, expect } from "@playwright/test";

test.describe("Song Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard before each test
    await page.goto("/dashboard");
  });

  test("should show search input with correct placeholder", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(
      "Search songs by title or artist..."
    );
    await expect(searchInput).toBeVisible();
  });

  test("should show loading state when searching", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Search songs by title or artist..."
    );
    await searchInput.fill("despacito");

    // Check if loading message appears
    const loadingMessage = page.getByText("Loading songs...");
    await expect(loadingMessage).toBeVisible();
  });

  test("should display search results", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Search songs by title or artist..."
    );
    await searchInput.fill("despacito");

    // Wait for loading to finish
    await page.waitForSelector("text=Loading songs...", { state: "hidden" });

    // Check if results are displayed
    const songItems = page.locator(".bg-white.rounded-lg");
    await expect(songItems).toHaveCount(1);
  });

  test("should show no results message when no songs found", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(
      "Search songs by title or artist..."
    );
    await searchInput.fill("xxxxxxxxxxx");

    // Wait for loading to finish
    await page.waitForSelector("text=Loading songs...", { state: "hidden" });

    // Check for no results message
    const noResultsMessage = page.getByText(
      "No songs found. Try searching for something else."
    );
    await expect(noResultsMessage).toBeVisible();
  });

  test("should toggle favorite when clicking heart icon", async ({ page }) => {
    // Search for a song first
    const searchInput = page.getByPlaceholder(
      "Search songs by title or artist..."
    );
    await searchInput.fill("despacito");

    // Wait for results
    await page.waitForSelector("text=Loading songs...", { state: "hidden" });

    // Click the favorite button
    const favoriteButton = page
      .locator("button")
      .filter({ hasText: "♡" })
      .first();
    await favoriteButton.click();

    // Verify the favorite state changed (heart filled)
    await expect(favoriteButton).toHaveClass(/text-red-500/);
  });
});
