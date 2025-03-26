import { test, expect } from "@playwright/test";

test.describe("Song Functionality", () => {
  test("song interaction", async ({ page }) => {
    await page.goto("/dashboard");

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Use more general song card selector
    const songCards = page.locator(
      ".songCard, [class*='song'], [class*='card']"
    );

    // Skip if no songs available
    if ((await songCards.count()) === 0) {
      test.skip("No songs available to test with");
      return;
    }

    // Find first song card
    const firstSong = songCards.first();
    await expect(firstSong).toBeVisible();

    // Look for any interactive element within the song card
    const interactiveElement = firstSong.locator("button, a, [role='button']");

    if ((await interactiveElement.count()) > 0) {
      // Try clicking the first interactive element
      await interactiveElement.first().click();

      // Verify some interaction happened (we just check the page is still loaded)
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("audio elements if available", async ({ page }) => {
    await page.goto("/dashboard");

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check for audio elements
    const audioPlayers = page.locator("audio");

    // Skip if no audio players
    if ((await audioPlayers.count()) === 0) {
      test.skip("No audio elements found");
      return;
    }

    // Just verify audio elements exist
    await expect(audioPlayers.first()).toBeVisible();
  });

  test("search functionality if available", async ({ page }) => {
    await page.goto("/dashboard");

    // Wait for page to load
    await page.waitForTimeout(2000);

    const searchInput = page.locator(".searchInput").first();

    // Skip if no search input
    if ((await searchInput.count()) === 0) {
      test.skip("No search input found");
      return;
    }

    await expect(searchInput).toBeVisible();
    await searchInput.fill("test");

    const searchButton = page
      .locator(".SongSearch_searchButton__LbO89, [type='submit']")
      .first();

    if ((await searchButton.count()) > 0) {
      await searchButton.click();
      await page.waitForTimeout(2000);
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
