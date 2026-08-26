import { test } from "../fixtures/test-options";
import { productFixtures } from "./data/product-fixtures";

// One describe block per fixture entry in tests/data/product-fixtures.ts —
// core tests run for every entry, variant tests only for the elements that
// entry declares. See ProductFixture in tests/data/product-fixtures.ts for
// the field-by-field breakdown.
for (const product of productFixtures) {
  test.describe(`${product.label} product page`, () => {
    test.beforeEach(async ({ productPage }) => {
      await productPage.goto(product.url);
    });

    // Core tests - guaranteed by the product page template, run for every fixture entry.

    // 1. Check the product's H1 heading matches the fixture's expected name.
    test("displays the product heading", async ({ productPage }) => {
      await productPage.assertHeading(product.heading);
    });

    // 2. Check the manufacturer's hover-text logo link is visible and links back to their overview page.
    test("displays the manufacturer logo hover link back to the manufacturer page", async ({ productPage }) => {
      await productPage.assertManufacturerLogoLink(product.manufacturerName, product.manufacturerUrlSuffix);
    });

    // 3. Check the manufacturer's telephone number is visible with the correct tel: href.
    test("displays the manufacturer's telephone number with the correct tel: href", async ({ productPage }) => {
      await productPage.assertTelephoneLink(product.telephoneNumber, product.telephoneHref);
    });

    // 4. Check the manufacturer's website link is visible with the correct href.
    test("displays the manufacturer's website link", async ({ productPage }) => {
      await productPage.assertWebsiteLink(product.websiteUrl);
    });

    // 5. Check the NBS Source logo is visible and links back to the homepage.
    test("displays the NBS Source logo linking back to the homepage", async ({ productPage }) => {
      await productPage.assertSourceLogoLink();
    });

    // 6. Check the "I'm a manufacturer" button is visible with the correct URL.
    test("displays the 'I'm a manufacturer' button with the correct URL", async ({ basePage }) => {
      await basePage.verifyImAManufacturerButton();
    });

    // 7. Check the "Contact manufacturer" button opens the popup with the expected fields and buttons.
    test("'contact manufacturer' button creates a pop up window when clicked", async ({ basePage }) => {
      await basePage.contactManufacturerButtonBehavior();
    });

    // 8. Back-to-top button — full journey: hidden at top, visible after scroll, returns to top on click.
    test("back-to-top button behaves correctly when scrolling", async ({ basePage }) => {
      await basePage.assertBackToTopButtonBehavesAsExpected();
    });

    // Variant tests - only exist because this fixture entry declared them; no test is generated for an undeclared element.

    // 9. One test per declared certification badge — checks it's visible with the correct title and href.
    for (const certification of product.certifications ?? []) {
      test(`displays the "${certification.name}" certification`, async ({ productPage }) => {
        await productPage.assertContentLink(certification.name, certification.hrefSuffix);
      });
    }

    // 10. One test per declared literature document — checks it's visible with the correct title and href.
    for (const literature of product.literatureDocuments ?? []) {
      test(`displays the "${literature.name}" literature document`, async ({ productPage }) => {
        await productPage.assertContentLink(literature.name, literature.hrefSuffix);
      });
    }

    // 11. One test per declared case study — checks it's visible with the correct title and href.
    for (const caseStudy of product.caseStudies ?? []) {
      test(`displays the "${caseStudy.name}" case study`, async ({ productPage }) => {
        await productPage.assertContentLink(caseStudy.name, caseStudy.hrefSuffix);
      });
    }

    // 12. One test per declared related product tile — checks it's visible with the correct title and href.
    for (const relatedProduct of product.relatedProducts ?? []) {
      test(`displays the related product "${relatedProduct.name}"`, async ({ productPage }) => {
        await productPage.assertContentLink(relatedProduct.name, relatedProduct.hrefSuffix);
      });
    }
  });
}
