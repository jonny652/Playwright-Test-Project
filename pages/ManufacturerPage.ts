import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/** One navigation tab in the manufacturer page's tab bar. */
export type ManufacturerTab = {
  label: string;
  hrefSuffix: string;
};

/**
 * One "extra" social link a manufacturer page may or may not display —
 * e.g. LinkedIn, Twitter. Every manufacturer page shows at least a contact
 * info bar, but which social platforms appear (and how many) varies.
 */
export type SocialLink = {
  platform: string;
  url: string;
};

// The manufacturer page template shared by every manufacturer
// (source.thenbs.com/en/gb/manufacturer/<slug>/<manufacturerId>/overview).
// Core locators/methods below are guaranteed by the template and used for
// every fixture entry; assertSocialLink() covers the variant social links
// that only some manufacturers declare.
export class ManufacturerPage extends BasePage {
  readonly sourceLogo: Locator;
  readonly allTabs: Locator;
  readonly heartAddItemToCollectionIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.sourceLogo = page.locator("a.brand-primary.wrapper");
    this.allTabs = page.locator('.mat-mdc-tab-links a[role="tab"]');
    this.heartAddItemToCollectionIcon = page.locator('[data-mat-icon-name="heart-circle-plus"].foreground-heart').first();
  }

  /** Navigate to a manufacturer page by its relative path. */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  private linkByHref(href: string): Locator {
    return this.page.locator(`a[href="${href}"]`);
  }

  // CORE

  /** The manufacturer page's H1 heading contains the given name. */
  async assertHeading(expectedName: string): Promise<void> {
    await expect(this.heading).toContainText(expectedName);
  }

  /**
   * The NBS Source logo is visible and links back to the homepage. Matched
   * by suffix — this widget is shared with the product page and is subject
   * to the same locale-prefix drift ("/en/gb" vs "/en-us/gb") documented on
   * ProductPage.linkByHrefSuffix() in pages/ProductPages.ts.
   */
  async assertSourceLogoLink(): Promise<void> {
    await expect(this.sourceLogo).toHaveAttribute("href", /\/gb$/);
  }

  /** The manufacturer's telephone link is visible with the correct tel: href. */
  async assertTelephoneLink(telephoneNumber: string, telephoneHref: string): Promise<void> {
    const link = this.linkByHref(telephoneHref);
    await expect(link).toBeVisible();
    await expect(link).toHaveText(telephoneNumber);
  }

  /** The manufacturer's website link is visible, correct, and opens in a new tab. */
  async assertWebsiteLink(websiteUrl: string): Promise<void> {
    const link = this.linkByHref(websiteUrl);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
  }

  /**
   * Every tab is visible with the correct href, and the tab bar's labels
   * match the given order exactly — catches a tab being added, removed, or
   * reordered without changing any individual locator. Tabs are located by
   * href (not a `data-cy` attribute) because that attribute's value for the
   * third tab differs by manufacturer (e.g. "certificatesTab" vs "cpdTab");
   * href-based lookup sidesteps that entirely. Scoped to the tab bar itself
   * (`.mat-mdc-tab-links`) rather than the whole page — some tab hrefs (e.g.
   * "Products") are reused elsewhere on the page by an unrelated "View all
   * products" link with the identical href, which a page-wide lookup would
   * also match.
   */
  async assertTabsVisibilityOrderAndHref(tabs: ManufacturerTab[]): Promise<void> {
    for (const tab of tabs) {
      const link = this.page.locator(`.mat-mdc-tab-links a[href="${tab.hrefSuffix}"]`);
      await expect(link).toBeVisible();
    }

    const tabLabels = await this.allTabs.allTextContents();
    expect(tabLabels.map((label) => label.trim())).toEqual(tabs.map((tab) => tab.label));
  }

  /** Assert the Heart icon allows logged-in users to add this manufacturer to their collection. */
  async assertCollectionButtonBehavesAsExpected(): Promise<void> {
    await expect(this.heartAddItemToCollectionIcon).toHaveAttribute("title", "Select item");

    await this.heartAddItemToCollectionIcon.click();

    await expect(this.heartAddItemToCollectionIcon).toHaveClass(/active/);
    await expect(this.heartAddItemToCollectionIcon).toHaveAttribute("title", "Deselect item");

    const selectionBar = this.page.getByText(/Selected item \(\d+\)/);
    await expect(selectionBar).toBeVisible();
    await expect(selectionBar).toHaveText("Selected item (1)");
  }

  // VARIANT

  /** A single social link (LinkedIn, Twitter, ...) is visible with the correct href. */
  async assertSocialLink(url: string): Promise<void> {
    const link = this.linkByHref(url);
    await expect(link).toBeVisible();
  }
}
