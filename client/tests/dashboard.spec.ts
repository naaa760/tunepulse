import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard page
    await page.goto("/dashboard");
  });

  test("should display the dashboard page", async ({ page }) => {
    // Check if the title is visible
    await expect(page.locator("h1")).toContainText("Your Music Dashboard");
  });

  test("should display songs when loaded", async ({ page }) => {
    // Wait for the songs to load
    await page.waitForSelector("table");

    // Check if at least one song is displayed
    const songRows = page.locator("tbody tr");
    await expect(songRows).toHaveCount({ min: 1 });
  });

  test("should filter songs when searching", async ({ page }) => {
    // Wait for the songs to load
    await page.waitForSelector("table");

    // Get the initial count of songs
    const initialCount = await page.locator("tbody tr").count();

    // Type a search query
    await page.fill('input[type="text"]', "Queen");

    // Wait for the search results
    await page.waitForTimeout(500);

    // Get the filtered count of songs
    const filteredCount = await page.locator("tbody tr").count();

    // Expect the filtered count to be less than or equal to the initial count
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test("should toggle favorite status when clicking the heart icon", async ({
    page,
  }) => {
    // Wait for the songs to load
    await page.waitForSelector("table");

    // Get the first heart button
    const heartButton = page.locator("tbody tr").first().locator("button");

    // Check the initial state
    const initialClass = await heartButton.getAttribute("class");

    // Click the heart button
    await heartButton.click();

    // Wait for the state to change
    await page.waitForTimeout(500);

    // Get the updated class
    const updatedClass = await heartButton.getAttribute("class");

    // Expect the class to have changed
    expect(updatedClass).not.toEqual(initialClass);
  });
});
