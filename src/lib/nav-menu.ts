import { serviceCategories } from "@/lib/service-categories";
import { homeAnchors, industriesServed, siteCta } from "@/lib/site-content";

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
  { label: "Benefits", href: homeAnchors.features },
  { label: "Why Choose Us", href: homeAnchors.whyUs },
  { label: "Roles", href: homeAnchors.roles },
  { label: "Reviews", href: homeAnchors.reviews },
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
      { label: "About us", href: homeAnchors.whyUs },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Benefits", href: homeAnchors.features },
      { label: "Services", href: homeAnchors.services },
      { label: "Industries", href: homeAnchors.industries },
      { label: "Popular Roles", href: homeAnchors.roles },
      { label: "Reviews", href: homeAnchors.reviews },
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

export const navServicesLinks: readonly NavLink[] = serviceCategories.map((category) => ({
  label: category.shortTitle,
  href: `/services/${category.slug}`,
}));

export const navIndustryLinks: readonly NavLink[] = industriesServed.items.map(
  (item): NavLink => ({
    label: item.title,
    href: homeAnchors.industries,
  }),
);
