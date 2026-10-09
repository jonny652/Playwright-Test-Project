import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * One "extra" element a product page may or may not display — a
 * certification badge, a literature document, a case study, or a related
 * product tile. All four render identically in the DOM: an anchor with no
 * visible text, a `title="View {name}"` attribute, and a unique href.
 *
 * `hrefSuffix` is locale-free (from "/gb/..." onward) — see
 * ProductPage.linkByHrefSuffix() for why.
 */
export type ProductContentLink = {
  name: string;
  hrefSuffix: string;
};

// The product detail page template shared by every manufacturer's products
// (source.thenbs.com/en/gb/product/<slug>/<manufacturerId>/<productId>).
// Core locators/methods below are guaranteed by the template and used for
// every fixture entry; assertContentLink() below covers the variant
// elements (certifications, literature, case studies, related products)
// that only some products declare.
export class ProductPage extends BasePage {
  readonly sourceLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.sourceLogo = page.locator("a.brand-primary.wrapper");
  }

  /** Navigate to a product page by its relative path. */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  private linkByHref(href: string): Locator {
    return this.page.locator(`a[href="${href}"]`);
  }

  /**
   * Matches an anchor whose href *ends with* the given (locale-free) path,
   * e.g. "/gb/manufacturer/dyson/.../overview". The manufacturer hover-link
   * and the certification/literature/case-study/related-product links are
   * rendered by a locale-aware widget that prefixes the path with whatever
   * locale it resolves for the current viewer (`/en/...`, `/en-us/...`,
   * etc.) — unlike the manufacturer page's own router-relative links, which
   * stay pinned to the current route's locale. Matching on the suffix keeps
   * these assertions correct regardless of which locale the viewer resolves.
   */
  private linkByHrefSuffix(hrefSuffix: string): Locator {
    return this.page.locator(`a[href$="${hrefSuffix}"]`);
  }

  // CORE

  /** The product's H1 heading matches the given name. */
  async assertHeading(expectedName: string): Promise<void> {
    await expect(this.heading).toHaveText(expectedName);
  }

  /** The manufacturer's logo hover link ("View more from {manufacturer}") is visible and links back to their overview page. */
  async assertManufacturerLogoLink(manufacturerName: string, manufacturerUrlSuffix: string): Promise<void> {
    const link = this.page.getByRole("link", { name: `View more from ${manufacturerName}` });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", new RegExp(`${escapeForRegExp(manufacturerUrlSuffix)}$`));
  }

  /** The manufacturer's telephone link is visible with the correct tel: href. */
  async assertTelephoneLink(telephoneNumber: string, telephoneHref: string): Promise<void> {
    const link = this.linkByHref(telephoneHref);
    await expect(link).toBeVisible();
    await expect(link).toHaveText(telephoneNumber);
  }

  /** The manufacturer's website link is visible with the correct href. */
  async assertWebsiteLink(websiteUrl: string): Promise<void> {
    const link = this.linkByHref(websiteUrl);
    await expect(link).toBeVisible();
    await expect(link).toHaveText("Website");
  }

  /**
   * The NBS Source logo is visible and links back to the homepage — same
   * check as the manufacturer pages' equivalent test. Matched by suffix for
   * the same reason as linkByHrefSuffix() above: this widget's locale
   * prefix depends on the viewer's resolved locale ("/en/gb", "/en-us/gb", etc).
   */
  async assertSourceLogoLink(): Promise<void> {
    await expect(this.sourceLogo).toHaveAttribute("href", /\/gb$/);
  }

  // VARIANT

  /** A single content link (certification / literature document / case study / related product) is visible with the correct title and href. */
  async assertContentLink(name: string, hrefSuffix: string): Promise<void> {
    const link = this.linkByHrefSuffix(hrefSuffix);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("title", `View ${name}`);
  }
}

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
