import { test, expect } from "../fixtures/test-options";
import { generateAccessibilityReport } from "../utils/accessability";
import { applyVisualRegression } from "../utils/visual-regression";
import { manufacturerFixtures } from "./data/manufacturer-fixtures";

const dyson = manufacturerFixtures.find((manufacturer) => manufacturer.label === "Dyson");

if (!dyson) {
  throw new Error("The Dyson manufacturer fixture is required by this spec.");
}

test.describe("Dyson manufacturer page", () => {
  test.beforeEach(async ({ nbsHomePage, page }) => {
    await nbsHomePage.goto();
    await nbsHomePage.closePopup();
    await nbsHomePage.search("dyson");
    await nbsHomePage.openManufacturersTab();
    await nbsHomePage.openDysonManufacturer();
    await expect(page).toHaveURL(dyson.url);
  });

  test("displays the Dyson heading", async ({ manufacturerPage }) => {
    await expect(manufacturerPage.heading).toBeVisible();
    await expect(manufacturerPage.heading).toContainText("Dyson");
  });

  test("displays the Source logo linking back to the homepage", async ({ manufacturerPage }) => {
    await expect(manufacturerPage.sourceLogo).toHaveAttribute("href", "/en/gb");
  });

  test("displays the 'I'm a manufacturer' button with the correct text and URL", async ({ basePage }) => {
    await expect(basePage.imAManufacturerButton).toBeVisible();
    await expect(basePage.imAManufacturerButton).toContainText("I'm a manufacturer");
    await expect(basePage.imAManufacturerButton).toHaveAttribute("href", basePage.manufactureUrl);
  });

  test("visual regression of the Dyson manufacturer page", async ({ page }, testInfo) => {
    await applyVisualRegression(page, testInfo.project.name, "dyson-manufacturer-page", { testInfo });
  });

  test("accessibility audit of the Dyson manufacturer page", async ({ page }) => {
    await generateAccessibilityReport(page, "dyson-accessibility-report.html");
  });

  test("back-to-top button behaves correctly when scrolling", async ({ basePage }) => {
    await basePage.assertBackToTopButtonBehavesAsExpected();
  });

  test("navigation tabs are visible in the correct order and have correct hrefs", async ({ manufacturerPage }) => {
    await manufacturerPage.assertTabsVisibilityOrderAndHref(dyson.tabs);
  });

  test("displays the Dyson telephone number with the correct href", async ({ manufacturerPage }) => {
    await manufacturerPage.assertTelephoneLink(dyson.telephoneNumber, dyson.telephoneHref);
  });

  test("displays the Dyson website link", async ({ manufacturerPage }) => {
    await manufacturerPage.assertWebsiteLink(dyson.websiteUrl);
  });

  test("displays the Dyson LinkedIn link", async ({ manufacturerPage }) => {
    const linkedIn = dyson.socialLinks?.find((link) => link.platform === "LinkedIn");
    if (!linkedIn) {
      throw new Error("The Dyson LinkedIn fixture is required by this spec.");
    }
    await manufacturerPage.assertSocialLink(linkedIn.url);
  });

  test("Heart icon allows logged-in users to add the manufacturer to their collection", async ({ manufacturerPage }) => {
    await manufacturerPage.assertCollectionButtonBehavesAsExpected();
  });

  test("'contact manufacturer' button creates a pop-up window when clicked", async ({ basePage }) => {
    await basePage.contactManufacturerButtonBehavior();
  });
});
