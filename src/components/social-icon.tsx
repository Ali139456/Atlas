import { createLucideIcon, type LucideIcon } from "lucide-react";

/** Lucide 1.x removed brand icons; these use createLucideIcon with legacy stroke paths. */
export const LinkedinIcon = createLucideIcon("linkedin", [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z", key: "c2jq9f" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
]);

export const FacebookIcon = createLucideIcon("facebook", [
  ["path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }],
]);

export const InstagramIcon = createLucideIcon("instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }],
]);

export const XSocialIcon = createLucideIcon("x-social", [
  ["path", { d: "M4 4l16 16", key: "x1" }],
  ["path", { d: "M20 4L4 20", key: "x2" }],
]);

const socialIcons = {
  linkedin: LinkedinIcon,
  x: XSocialIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} satisfies Record<string, LucideIcon>;

export type SocialIconName = keyof typeof socialIcons;

export function SocialIcon({
  icon,
  className = "h-[1.15rem] w-[1.15rem]",
}: {
  icon: SocialIconName;
  className?: string;
}) {
  const Icon = socialIcons[icon];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
