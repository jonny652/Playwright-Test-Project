import { test } from "../fixtures/test-options";
import { applyVisualRegression } from "../utils/visual-regression";
import { generateAccessibilityReport } from "../utils/accessability";
import { manufacturerFixtures } from "./data/manufacturer-fixtures";

// One describe block per fixture entry in tests/data/manufacturer-fixtures.ts —
// core tests run for every entry, variant tests only for the social links
// that entry declares. See ManufacturerFixture in
// tests/data/manufacturer-fixtures.ts for the field-by-field breakdown.
for (const manufacturer of manufacturerFixtures) {
  test.describe(`${manufacturer.label} manufacturer page`, () => {
    test.beforeEach(async ({ manufacturerPage }) => {
      await manufacturerPage.goto(manufacturer.url);
    });

    // Core tests - guaranteed by the manufacturer page template, run for every fixture entry.

    // 1. Check the page's H1 heading contains the fixture's expected name.
    test("displays the manufacturer heading", async ({ manufacturerPage }) => {
      await manufacturerPage.assertHeading(manufacturer.heading);
    });

    // 2. Check the NBS Source logo is visible and links back to the homepage.
    test("displays the NBS Source logo linking back to the homepage", async ({ manufacturerPage }) => {
      await manufacturerPage.assertSourceLogoLink();
    });

    // 3. Check the "I'm a manufacturer" button is visible with the correct URL.
    test("displays the 'I'm a manufacturer' button with the correct URL", async ({ basePage }) => {
      await basePage.verifyImAManufacturerButton();
    });

    // 4. Check the manufacturer's telephone number is visible with the correct text.
    test("displays the manufacturer's telephone number with the correct tel: href", async ({ manufacturerPage }) => {
      await manufacturerPage.assertTelephoneLink(manufacturer.telephoneNumber, manufacturer.telephoneHref);
    });

    // 5. Check the manufacturer's website link is visible and opens in a new tab.
    test("displays the manufacturer's website link", async ({ manufacturerPage }) => {
      await manufacturerPage.assertWebsiteLink(manufacturer.websiteUrl);
    });

    // 6. Check every navigation tab is visible, in the correct order, with the correct hrefs.
    test("navigation tabs are visible, in the correct order, and have correct hrefs", async ({ manufacturerPage }) => {
      await manufacturerPage.assertTabsVisibilityOrderAndHref(manufacturer.tabs);
    });

    // 7. Check the Heart icon allows logged-in users to add this manufacturer to their collection.
    test("Heart icon allows logged in users to add an item to their collection", async ({ manufacturerPage }) => {
      await manufacturerPage.assertCollectionButtonBehavesAsExpected();
    });

    // 8. Check the "Contact manufacturer" button opens the popup with the expected fields and buttons.
    test("'contact manufacturer' button creates a pop up window when clicked", async ({ basePage }) => {
      await basePage.contactManufacturerButtonBehavior();
    });

    // 9. Back-to-top button — full journey: hidden at top, visible after scroll, returns to top on click.
    test("back-to-top button behaves correctly when scrolling", async ({ basePage }) => {
      await basePage.assertBackToTopButtonBehavesAsExpected();
    });

    // 10. Compare the page against a saved screenshot (visual regression).
    test("visual regression of the manufacturer page", async ({ page }, testInfo) => {
      await applyVisualRegression(page, testInfo.project.name, `${manufacturer.label}-manufacturer-page`);
    });

    // 11. Run an accessibility scan and save the results as an HTML report.
    test("accessibility audit of the manufacturer page", async ({ page }) => {
      await generateAccessibilityReport(page, `${manufacturer.label}-accessibility-report.html`);
    });

    // Variant tests - only exist because this fixture entry declared them; no test is generated for an undeclared social link.

    // 12. One test per declared social link — checks it's visible with the correct href.
    for (const socialLink of manufacturer.socialLinks ?? []) {
      test(`displays the ${socialLink.platform} social link`, async ({ manufacturerPage }) => {
        await manufacturerPage.assertSocialLink(socialLink.url);
      });
    }
  });
}
