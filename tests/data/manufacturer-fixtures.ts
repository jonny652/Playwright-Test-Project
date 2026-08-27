import type { ManufacturerTab, SocialLink } from "../../pages/ManufacturerPage";

/**
 * Fixture data for the shared manufacturer-page template (pages/ManufacturerPage.ts).
 *
 * Core fields are guaranteed by every manufacturer page and drive one
 * unconditional test each. `socialLinks` is an optional, repeatable array —
 * each declared item drives one generated test, and an omitted/shorter
 * array means fewer (or no) social-link tests for that manufacturer (never
 * a failing assertion for a platform that was never there).
 */
export type ManufacturerFixture = {
  /** Used as the describe-block/test-title label. */
  label: string;
  /** Relative path passed to page.goto() — the manufacturer's overview page. */
  url: string;
  heading: string;
  telephoneNumber: string;
  telephoneHref: string;
  websiteUrl: string;
  /** Core/required — every manufacturer page has the full tab bar, just with different labels/hrefs. */
  tabs: ManufacturerTab[];
  socialLinks?: SocialLink[];
};

export const manufacturerFixtures: ManufacturerFixture[] = [
  {
    label: "Dyson",
    url: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview",
    heading: "Dyson",
    telephoneNumber: "08003457788",
    telephoneHref: "tel:08003457788",
    websiteUrl: "https://www.dyson.co.uk/commercial/overview",
    tabs: [
      { label: "Overview", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview" },
      { label: "Products", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products" },
      { label: "Certifications", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications" },
      { label: "Literature", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature" },
      { label: "Case studies", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies" },
      { label: "About us", hrefSuffix: "/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about" },
    ],
    socialLinks: [{ platform: "LinkedIn", url: "https://www.linkedin.com/company/dyson/" }],
  },
  {
    // Declares a second social link (Twitter) that Dyson doesn't have —
    // a real, already-tested example of a variant element only some
    // manufacturers declare.
    label: "Abloy UK",
    url: "/en/gb/manufacturer/abloy-uk/nbAnmJUFmBRb9A2M4g4Gpz/overview",
    heading: "Abloy UK",
    telephoneNumber: "+44 (0)1902 364500",
    telephoneHref: "tel:+44 (0)1902 364500",
    websiteUrl: "https://www.abloy.co.uk",
    // Confirmed live (both via direct goto and the full search/click-through
    // journey): Abloy's tab bar only ever renders these three tabs — no
    // Products, Literature, or Case studies tab, unlike Dyson's six. The
    // AbloyManufacturerPage.ts Cucumber page object assumes all six exist,
    // but that assertion is BDD-only code that's never actually been
    // exercised (the bdd-tests CI job is commented out) — this fixture
    // reflects the real, verified DOM instead.
    tabs: [
      { label: "Overview", hrefSuffix: "/en/gb/manufacturer/abloy-uk/nbAnmJUFmBRb9A2M4g4Gpz/overview" },
      { label: "CPD", hrefSuffix: "/en/gb/manufacturer/abloy-uk/nbAnmJUFmBRb9A2M4g4Gpz/cpd" },
      { label: "About us", hrefSuffix: "/en/gb/manufacturer/abloy-uk/nbAnmJUFmBRb9A2M4g4Gpz/about" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/abloy-uk/" },
      { platform: "Twitter", url: "https://twitter.com/abloymedia" },
    ],
  },
];
