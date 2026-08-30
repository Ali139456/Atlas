import type { MetadataRoute } from "next";
import { getPublicIndustries, getPublicServices } from "@/lib/cms/public-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atlasglobalfinances.com";
  const [services, industries] = await Promise.all([
    getPublicServices(),
    getPublicIndustries(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...industryPages];
}
