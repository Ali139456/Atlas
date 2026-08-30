import { ContactSection } from "@/components/contact-section";
import { CoreServicesSection } from "@/components/section-core-services";
import { FinalCtaSection } from "@/components/section-final-cta";
import { HowItWorksSection } from "@/components/section-how-it-works";
import { IndustriesServedSection } from "@/components/section-industries-served";
import { Hero } from "@/components/hero";
import { WhyChooseUsSection } from "@/components/section-mission";
import { TechnologySection } from "@/components/section-technology";
import { ValuePropositionSection } from "@/components/section-value-prop";
import { SiteFooterServer } from "@/components/site-footer-server";
import { SiteHeaderServer } from "@/components/site-header-server";
import {
  getPublicCoreServicesSection,
  getPublicFormOptions,
  getPublicHomeContent,
  getPublicIndustriesSection,
  getPublicSiteSettings,
} from "@/lib/cms/public-content";

export default async function Home() {
  const [home, settings, coreServices, industriesSection, formOptions] = await Promise.all([
    getPublicHomeContent(),
    getPublicSiteSettings(),
    getPublicCoreServicesSection(),
    getPublicIndustriesSection(),
    getPublicFormOptions(),
  ]);

  return (
    <>
      <SiteHeaderServer />
      <main className="site-main site-main--home section-bg">
        <Hero content={home.hero} />
        <ValuePropositionSection content={home.valueProposition} />
        <CoreServicesSection content={coreServices} />
        <WhyChooseUsSection content={home.whyChooseUs} />
        <TechnologySection content={home.technologySection} />
        <IndustriesServedSection content={industriesSection} />
        <HowItWorksSection content={home.howItWorks} />
        <ContactSection
          contactForm={home.contactForm}
          site={settings.site}
          siteCta={settings.siteCta}
          formOptions={formOptions}
        />
        <FinalCtaSection content={home.finalCta} siteCta={settings.siteCta} />
      </main>
      <SiteFooterServer />
    </>
  );
}
