import { serviceCategories } from "@/lib/service-categories";
import { homeAnchors, usefulLinksSection } from "@/lib/site-content";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavColumn = {
  heading?: string;
  links: readonly NavLink[];
};

export const navCta = {
  label: "Enquire Now",
  href: homeAnchors.contact,
} as const;

export const navPrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: homeAnchors.whyUs },
  { label: "Contact Us", href: homeAnchors.contact },
] as const;

export const footerBarLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: homeAnchors.whyUs },
  { label: "Services", href: homeAnchors.services },
  { label: "Industry", href: homeAnchors.industries },
  { label: "Resources", href: homeAnchors.resources },
  { label: "Contact Us", href: homeAnchors.contact },
];

export const footerLinkGroups = [
  {
    title: "Useful Links",
    links: [
      { label: "About Us", href: homeAnchors.whyUs },
      { label: "Technology", href: "https://www.outsourcinghubindia.com/technology/", external: true },
      { label: "Data Security", href: "https://www.outsourcinghubindia.com/data-security/", external: true },
      {
        label: "How to Outsource",
        href: "https://www.outsourcinghubindia.com/how-to-outsource-accounting/",
        external: true,
      },
      { label: "Blog", href: "https://www.outsourcinghubindia.com/blog/", external: true },
      { label: "Careers", href: "https://www.outsourcinghubindia.com/career/", external: true },
      { label: "CSR Policy", href: "https://www.outsourcinghubindia.com/csr-policy/", external: true },
      { label: "Privacy Policy", href: "https://www.outsourcinghubindia.com/privacy-policy/", external: true },
      { label: "Cookie Policy", href: "https://www.outsourcinghubindia.com/cookie-policy/", external: true },
      { label: "Testimonials", href: "https://www.outsourcinghubindia.com/testimonials/", external: true },
      { label: "Partnership", href: "https://www.outsourcinghubindia.com/partnership", external: true },
    ] satisfies readonly NavLink[],
  },
  {
    title: "Industries",
    links: [
      {
        label: "Real Estate",
        href: "https://www.outsourcinghubindia.com/real-estate-accountants/",
        external: true,
      },
      {
        label: "Construction",
        href: "https://www.outsourcinghubindia.com/accounting-for-construction-companies/",
        external: true,
      },
      {
        label: "Logistics",
        href: "https://www.outsourcinghubindia.com/logistics-transportation/",
        external: true,
      },
      {
        label: "Retail",
        href: "https://www.outsourcinghubindia.com/retail-accounting-services/",
        external: true,
      },
      { label: "CPA Firms", href: "https://www.outsourcinghubindia.com/cpa-firms/", external: true },
    ] satisfies readonly NavLink[],
  },
] as const;

export const navServicesLinks: readonly NavLink[] = serviceCategories.map((category) => ({
  label: category.shortTitle,
  href: `/services/${category.slug}`,
}));

export const navResourcesLinks: readonly NavLink[] = [
  {
    label: "Case Studies",
    href: usefulLinksSection.items.find((item) => item.label === "Case Studies")?.href ?? homeAnchors.clients,
    external: true,
  },
  {
    label: "Process Snapshots",
    href: usefulLinksSection.items.find((item) => item.label === "Process Snapshots")?.href ?? homeAnchors.resources,
    external: true,
  },
  {
    label: "Blog",
    href: "https://www.outsourcinghubindia.com/blog/",
    external: true,
  },
  {
    label: "Testimonials",
    href: homeAnchors.clients,
  },
];

export const navIndustryColumns: readonly NavColumn[] = [
  {
    heading: "Real Estate",
    links: [
      { label: "Residential Real Estate", href: "/services/owners-developers" },
      { label: "Accounting For HOA/Condo", href: "/services/owners-developers" },
      { label: "Portfolio Accounting", href: "/services/investors" },
      { label: "Lease Abstraction", href: "/services/owners-developers" },
      { label: "Acquisition Support", href: "/services/owners-developers" },
      { label: "ESG Services", href: homeAnchors.contact },
      { label: "Fund Accounting", href: "/services/investors" },
      { label: "Student Housing", href: homeAnchors.contact },
      { label: "Financial Analysis", href: "/services/investors" },
      { label: "CAM Reconciliation", href: "/services/property-management" },
      { label: "Financial Controller", href: homeAnchors.contact },
    ],
  },
  {
    links: [
      { label: "Commercial Real Estate", href: "/services/owners-developers" },
      { label: "Construction Accounting", href: "/services/owners-developers" },
      { label: "Fixed Asset Accounting", href: "/services/asset-management" },
      { label: "Asset Management", href: "/services/asset-management" },
      { label: "Treasury Service", href: homeAnchors.contact },
      { label: "Year End Accounting", href: homeAnchors.contact },
      { label: "Senior/Assisted Living Accounting", href: homeAnchors.contact },
      { label: "Investment Analysis", href: "/services/investors" },
      { label: "BI Services", href: homeAnchors.contact },
      { label: "Property Management/Back Office", href: "/services/property-management" },
      { label: "Loan Abstraction", href: homeAnchors.contact },
    ],
  },
  {
    links: [
      { label: "Real Estate Canada", href: homeAnchors.contact },
      { label: "Logistics & Transportation", href: homeAnchors.industries },
      { label: "CPA Firms", href: homeAnchors.industries },
    ],
  },
  {
    links: [
      { label: "Real Estate UK", href: homeAnchors.contact },
      { label: "Retail", href: homeAnchors.industries },
    ],
  },
];
