import { test, expect } from "@playwright/test";

test.describe("Song Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
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

  test.skip("should show loading state when searching", async () => {});

  test.skip("should display search results", async () => {});

  test.skip("should show no results message when no songs found", async () => {});

  test.skip("should toggle favorite when clicking heart icon", async () => {});
});
