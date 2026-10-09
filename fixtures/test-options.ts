import { test as base } from "@playwright/test";
import { NbsHomePage } from "../pages/NbsHomePage";
import { BasePage } from "../pages/BasePage";
import { ProductPage } from "../pages/ProductPages";
import { ManufacturerPage } from "../pages/ManufacturerPage";

// The shape of the custom fixtures we're adding on top of Playwright's built-ins.
// DysonManufacturerPage/AbloyManufacturerPage are intentionally not fixtures here —
// they're still used directly by the Cucumber suite (features/support/world.ts),
// but the Playwright suite now drives manufacturer pages generically via
// ManufacturerPage + tests/data/manufacturer-fixtures.ts (see tests/manufacturer-page.spec.ts).
type Pages = {
  nbsHomePage: NbsHomePage;
  basePage: BasePage;
  productPage: ProductPage;
  manufacturerPage: ManufacturerPage;
};

// Extend the base test so every test can just ask for `nbsHomePage` /
// `productPage` — the fixture builds them (the "assistant who
// hands you the toolbox"), so tests never write `new NbsHomePage(page)`.
export const test = base.extend<Pages>({
  nbsHomePage: async ({ page }, use) => {
    await use(new NbsHomePage(page));
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  manufacturerPage: async ({ page }, use) => {
    await use(new ManufacturerPage(page));
  },
});

// Re-export expect so tests import both `test` and `expect` from here.
export { expect } from "@playwright/test";