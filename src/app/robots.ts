import type { MetadataRoute } from "next";
import { getAdminPath } from "@/lib/admin/config";

export default function robots(): MetadataRoute.Robots {
  const adminPath = getAdminPath();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atlasglobalfinances.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [`/${adminPath}`, "/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
