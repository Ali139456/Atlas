import { SiteFooter } from "@/components/site-footer";
import { getPublicFooter, getPublicSiteSettings } from "@/lib/cms/public-content";

export async function SiteFooterServer() {
  const [footer, settings] = await Promise.all([getPublicFooter(), getPublicSiteSettings()]);
  return (
    <SiteFooter
      site={settings.site}
      siteCta={settings.siteCta}
      footerLinkGroups={footer.footerLinkGroups}
      footerSocialLinks={footer.footerSocialLinks}
      footerBarLinks={footer.footerBarLinks}
    />
  );
}
