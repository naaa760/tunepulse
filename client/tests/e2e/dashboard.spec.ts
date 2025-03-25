import { test, expect } from "@playwright/test";

test.describe("Dashboard Layout", () => {
  test("should display navigation elements correctly", async ({ page }) => {
    await page.goto("/dashboard");

    // Check if navbar exists
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    // Check if app title is visible
    const appTitle = page.getByText("Music App");
    await expect(appTitle).toBeVisible();

    // Check if navigation links are present
    const dashboardLink = page.getByRole("link", { name: "Dashboard" });
    const favoritesLink = page.getByRole("link", { name: "Favorites" });
    const homeLink = page.getByRole("link", { name: "Home" });

    await expect(dashboardLink).toBeVisible();
    await expect(favoritesLink).toBeVisible();
    await expect(homeLink).toBeVisible();
  });

  test("should navigate to favorites page", async ({ page }) => {
    await page.goto("/dashboard");

    const favoritesLink = page.getByRole("link", { name: "Favorites" });
    await favoritesLink.click();

    // Check if URL changed to favorites page
    await expect(page).toHaveURL("/dashboard/favorites");
  });

  test("should navigate to home page", async ({ page }) => {
    await page.goto("/dashboard");

    const homeLink = page.getByRole("link", { name: "Home" });
    await homeLink.click();

    // Check if URL changed to home page
    await expect(page).toHaveURL("/");
  });
});
