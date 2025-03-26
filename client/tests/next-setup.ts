import { test as base, expect } from "@playwright/test";

// Extend the test fixture to add Next.js-specific behavior
export const test = base.extend({
  page: async ({ page }, use) => {
    // Increase default timeouts
    page.setDefaultTimeout(15000);

    // Add a method to navigate with Next.js
    page.navigateNextJs = async (selector) => {
      const element = page.locator(selector).first();
      await element.click();
      await page.waitForTimeout(1000);
      return page.url();
    };

    // Override click for links to handle Next.js routing
    const originalClick = page.click;
    page.click = async function (selector, options) {
      // If it's a link, use Next.js navigation
      const isLink =
        (await page
          .locator(selector)
          .filter({ has: page.locator("a") })
          .count()) > 0;

      if (isLink) {
        await page.locator(selector).click(options);
        await page.waitForTimeout(500);
      } else {
        await originalClick.call(page, selector, options);
      }
    };

    await use(page);
  },
});

export { expect };
