import { Page as PlaywrightPage } from "@playwright/test";

declare global {
  namespace Playwright {
    interface Page extends PlaywrightPage {
      navigateNextJs(selector: string): Promise<string>;
    }
  }
}

export {};
