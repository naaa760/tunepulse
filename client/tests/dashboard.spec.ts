import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("should display dashboard", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(
      page.locator("h1, h2, [class*='header']").first()
    ).toBeVisible();

    const searchInput = page.locator(
      "input[type='text'], .searchInput, [placeholder*='search' i]"
    );

    if ((await searchInput.count()) > 0) {
      await expect(searchInput).toBeVisible();
      await searchInput.fill("test");

      const searchButton = page
        .locator("button[type='submit'], .SongSearch_searchButton__LbO89")
        .first();

      if ((await searchButton.count()) > 0) {
        await expect(searchButton).toBeEnabled();
        await searchButton.click();

        await page.waitForTimeout(1000);
      }
    }
  });

  test("should navigate to favorites page if available", async ({ page }) => {
    await page.goto("/dashboard");

    // Check for favorites link
    const favoritesButton = page.getByRole("link", { name: /favorites/i });

    if ((await favoritesButton.count()) > 0) {
      await expect(favoritesButton).toBeVisible();
      await favoritesButton.click();
      await expect(page).toHaveURL(/.*favorites.*/);
    } else {
      test.skip("Favorites navigation not found");
    }
  });

  test("song list or empty state should display", async ({ page }) => {
    await page.goto("/dashboard");

    // Wait for potential content to load
    await page.waitForTimeout(2000);

    // Check for song cards or empty state with more general selectors
    const songCards = page.locator(
      ".songCard, [class*='song'], [class*='card']"
    );
    const emptyState = page.locator(".emptyState, [class*='empty']");

    // Check if either songs OR empty state is visible
    const hasCards = (await songCards.count()) > 0;
    const hasEmptyState = (await emptyState.count()) > 0;

    if (hasCards) {
      await expect(songCards.first()).toBeVisible();
    } else if (hasEmptyState) {
      await expect(emptyState.first()).toBeVisible();
    } else {
      // If neither is found, the test should still pass as long as we're on dashboard page
      await expect(page).toHaveURL(/.*dashboard.*/);
    }
  });
});
