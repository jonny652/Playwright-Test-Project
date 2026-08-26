import type { ProductContentLink } from "../../pages/ProductPages";

/**
 * Fixture data for the shared product-page template (pages/ProductPages.ts).
 *
 * Core fields are guaranteed by every product page and drive one
 * unconditional test each. Variant fields are optional, repeatable arrays —
 * each declared item drives one generated test, and an omitted array means
 * no test is generated for that element on this product (never a failing
 * assertion for something that was never there).
 *
 * `manufacturerUrlSuffix` and every `ProductContentLink.hrefSuffix` are stored
 * locale-free (from "/gb/..." onward, no "/en" or "/en-us" prefix) — see the
 * comment on ProductPage.linkByHrefSuffix() for why: these particular links
 * are rendered by a locale-aware widget whose locale prefix depends on the
 * viewer's resolved locale, unlike the rest of the site's router-relative links.
 */
export type ProductFixture = {
  /** Used as the describe-block/test-title label. */
  label: string;
  /** Relative path passed to page.goto() — see tests/dyson-manufacture.spec.ts's beforeEach for the same locale-redirect convention. */
  url: string;
  heading: string;
  manufacturerName: string;
  manufacturerUrlSuffix: string;
  telephoneNumber: string;
  telephoneHref: string;
  websiteUrl: string;
  certifications?: ProductContentLink[];
  literatureDocuments?: ProductContentLink[];
  caseStudies?: ProductContentLink[];
  relatedProducts?: ProductContentLink[];
};

export const productFixtures: ProductFixture[] = [
  {
    // Declares every variant element type, so this one entry covers all four
    // variant test groups on its own.
    label: "Dyson Airblade 9kJ Hand Dryer (HU03)",
    url: "product/dyson-airblade-9kj-hand-dryer-hu03/fmdLoC3ZGuYUyy8pKSG7Au/jmJPorRKb1DV8KXyP2uCS3",
    heading: "Dyson Airblade™ 9kJ Hand Dryer (HU03)",
    manufacturerName: "dyson",
    manufacturerUrlSuffix: "/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview",
    telephoneNumber: "08003457788",
    telephoneHref: "tel:08003457788",
    websiteUrl: "https://www.dyson.co.uk/commercial/overview",
    certifications: [
      {
        name: "Noise Abatement Society: Quiet Mark - Certified",
        hrefSuffix: "/gb/third-party-certification/noise-abatement-society-quiet-mark-certified/xkbLQbYS3k3MPaAqYKxoxQ/gY7F3Tm47Sgkr7gjmCgytj",
      },
      {
        name: "Quiet Mark Approval",
        hrefSuffix: "/gb/third-party-certification/quiet-mark-approval/9wrGwujdRGZg7QmHwmcLz8/6aUmgmENGuicTUckrLaSC1",
      },
      {
        name: "Quiet Mark Approval - Dyson Airblade V Hand Dryer HU03 (also known as 9kJ)",
        hrefSuffix: "/gb/third-party-certification/quiet-mark-approval-dyson-airblade-v-hand-dryer-hu03-also-known-as-9kj/5FDfootY1HypgkFVqQwhi5/rV1Zh2dGqHTn2hBCHNvpBQ",
      },
    ],
    literatureDocuments: [
      {
        name: "Dyson Airblade 9kJ - Technical Specification",
        hrefSuffix: "/gb/literature/-/3PeJ5iorw1kuMeoK71oFsa/3PeJ5iorw1kuMeoK71oFsa",
      },
      {
        name: "Dyson Airblade 9kJ - Operations Manual",
        hrefSuffix: "/gb/literature/-/899MocPs4En96zM7cDZuG/899MocPs4En96zM7cDZuG",
      },
    ],
    caseStudies: [
      {
        name: "Dyson and Welcome Break partner to boost sustainability and hygiene in motorway service washrooms",
        hrefSuffix: "/gb/case-study/-/xocvPs8oeEUmiE43i84P8a/aasYUQJSzbA8dxgVqaBpSd",
      },
    ],
    relatedProducts: [
      {
        name: "Dyson Airblade™ V Hand Dryer (HU02)",
        hrefSuffix: "/gb/product/dyson-airblade-v-hand-dryer-hu02/bzLzYhZcAjz4YH1yjF8PHM/6YkdMqGGu4Zh8YuqoT566v",
      },
    ],
  },
  {
    // A different manufacturer with no certifications, literature, case
    // studies, or related-product tiles declared — exercises the core tests
    // in isolation and confirms no variant tests get generated for it.
    label: "Abloy Door Loop 120° - Concealed Chrome (EA280)",
    url: "product/door-loop-120-concealed-chrome-ea280/8ngGHJ9X6Hh12VSfvcBr2t/p6pFKMh72qKceCN9XphdwT",
    heading: "Door Loop 120° - Concealed Chrome (EA280)",
    manufacturerName: "abloy-uk",
    manufacturerUrlSuffix: "/gb/manufacturer/abloy-uk/nbAnmJUFmBRb9A2M4g4Gpz/overview",
    telephoneNumber: "+44 (0)1902 364500",
    telephoneHref: "tel:+44 (0)1902 364500",
    websiteUrl: "https://www.abloy.co.uk",
  },
];
