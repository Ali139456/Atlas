import { ContactSection } from "@/components/contact-section";
import { CoreServicesSection } from "@/components/section-core-services";
import { FinalCtaSection } from "@/components/section-final-cta";
import { HowItWorksSection } from "@/components/section-how-it-works";
import { IndustriesServedSection } from "@/components/section-industries-served";
import { Hero } from "@/components/hero";
import { WhyChooseUsSection } from "@/components/section-mission";
import { TechnologySection } from "@/components/section-technology";
import { ValuePropositionSection } from "@/components/section-value-prop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="site-main site-main--home section-bg">
        <Hero />
        <ValuePropositionSection />
        <CoreServicesSection />
        <WhyChooseUsSection />
        <TechnologySection />
        <IndustriesServedSection />
        <HowItWorksSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
