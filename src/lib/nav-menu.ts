import { serviceCategories } from "@/lib/service-categories";
import { homeAnchors, industriesServed } from "@/lib/site-content";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const navCta = {
  label: "Inquire Now",
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
  { label: "Contact Us", href: homeAnchors.contact },
];

export const footerLinkGroups: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: "Useful Links",
    links: [
      { label: "About Us", href: homeAnchors.whyUs },
      { label: "Services", href: homeAnchors.services },
      { label: "Benefits", href: homeAnchors.features },
      { label: "Popular Roles", href: homeAnchors.roles },
      { label: "Contact Us", href: homeAnchors.contact },
    ],
  },
  {
    title: "Industries",
    links: industriesServed.items.map(
      (item): NavLink => ({
        label: item.title,
        href: homeAnchors.industries,
      }),
    ),
  },
];

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
