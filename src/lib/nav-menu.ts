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
