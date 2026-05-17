import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/section-faq";
import { FeaturesSection } from "@/components/section-features";
import { Hero } from "@/components/hero";
import { MissionSection } from "@/components/section-mission";
import { PricingSection } from "@/components/section-pricing";
import { ProcessSection } from "@/components/section-process";
import { ServicesSection } from "@/components/section-services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MissionSection />
        <FeaturesSection />
        <ServicesSection />
        <ProcessSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
