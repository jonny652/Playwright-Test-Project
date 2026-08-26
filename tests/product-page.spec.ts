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
    test("displays the product heading", async ({ productPage }) => {
      await productPage.assertHeading(product.heading);
    });

    test("displays the manufacturer logo hover link back to the manufacturer page", async ({ productPage }) => {
      await productPage.assertManufacturerLogoLink(product.manufacturerName, product.manufacturerUrlSuffix);
    });

    test("displays the manufacturer's telephone number with the correct tel: href", async ({ productPage }) => {
      await productPage.assertTelephoneLink(product.telephoneNumber, product.telephoneHref);
    });

    test("displays the manufacturer's website link", async ({ productPage }) => {
      await productPage.assertWebsiteLink(product.websiteUrl);
    });

    // Variant tests - only exist because this fixture entry declared them; no test is generated for an undeclared element.
    for (const certification of product.certifications ?? []) {
      test(`displays the "${certification.name}" certification`, async ({ productPage }) => {
        await productPage.assertContentLink(certification.name, certification.hrefSuffix);
      });
    }

    for (const literature of product.literatureDocuments ?? []) {
      test(`displays the "${literature.name}" literature document`, async ({ productPage }) => {
        await productPage.assertContentLink(literature.name, literature.hrefSuffix);
      });
    }

    for (const caseStudy of product.caseStudies ?? []) {
      test(`displays the "${caseStudy.name}" case study`, async ({ productPage }) => {
        await productPage.assertContentLink(caseStudy.name, caseStudy.hrefSuffix);
      });
    }

    for (const relatedProduct of product.relatedProducts ?? []) {
      test(`displays the related product "${relatedProduct.name}"`, async ({ productPage }) => {
        await productPage.assertContentLink(relatedProduct.name, relatedProduct.hrefSuffix);
      });
    }
  });
}
