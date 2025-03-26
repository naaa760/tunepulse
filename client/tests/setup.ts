import { test as base, expect } from "@playwright/test";

// Extend the test fixture to add our custom behavior
export const test = base.extend({
  page: async ({ page }, use) => {
    page.setDefaultTimeout(10000);

    const originalLocator = page.locator;
    page.locator = function (selector, options) {
      const locator = originalLocator.call(page, selector, options);

      const originalClick = locator.click;
      locator.click = async function (options) {
        try {
          return await originalClick.call(locator, options);
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.includes("strict mode violation")
          ) {
            console.log(
              `Handling strict mode error by using first() on ${selector}`
            );
            await locator.first().click(options);
          } else {
            throw error;
          }
        }
      };

      return locator;
    };

    await use(page);
  },
});

export { expect };
