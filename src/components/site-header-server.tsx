import { SiteHeader } from "@/components/site-header";
import { getPublicNavigation, getPublicSiteSettings } from "@/lib/cms/public-content";

export async function SiteHeaderServer() {
  const [nav, settings] = await Promise.all([getPublicNavigation(), getPublicSiteSettings()]);
  return (
    <SiteHeader
      primaryLinks={nav.primaryLinks}
      servicesLinks={nav.servicesLinks}
      industryLinks={nav.industryLinks}
      siteCta={settings.siteCta}
      brand={settings.site.brand}
      tagline={settings.site.tagline}
    />
  );
}
