import { industries } from "./industries";
import { coreServicesData } from "./core-services";
import { homeAnchors, siteCta } from "./site-content";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const navCta = {
  label: siteCta.label,
  href: siteCta.href,
} as const;

export const navPrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "Value", href: homeAnchors.value },
  { label: "Why Atlas", href: homeAnchors.whyUs },
  { label: "Technology", href: homeAnchors.technology },
  { label: "How It Works", href: homeAnchors.howItWorks },
  { label: "Contact Us", href: homeAnchors.contact },
] as const;

export const footerBarLinks: readonly NavLink[] = [
  { label: "Privacy Policy", href: homeAnchors.contact },
  { label: "Terms of Use", href: homeAnchors.contact },
];

export const footerLinkGroups: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Contact us", href: homeAnchors.contact },
      { label: "Why Atlas", href: homeAnchors.whyUs },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Value", href: homeAnchors.value },
      { label: "Services", href: homeAnchors.services },
      { label: "Technology", href: homeAnchors.technology },
      { label: "Industries", href: homeAnchors.industries },
      { label: "How It Works", href: homeAnchors.howItWorks },
    ],
  },
];

export const footerSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: "linkedin" as const,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: "x" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: "instagram" as const,
  },
] as const;

export const navServicesLinks: readonly NavLink[] = coreServicesData.map((service) => ({
  label: service.shortTitle,
  href: `/services/${service.slug}`,
}));

export const navIndustryLinks: readonly NavLink[] = industries.map(
  (item): NavLink => ({
    label: item.shortTitle,
    href: `/industries/${item.slug}`,
  }),
);
