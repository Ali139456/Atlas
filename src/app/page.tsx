import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/section-faq";
import { FeaturesSection } from "@/components/section-features";
import { IndustriesServedSection } from "@/components/section-industries-served";
import { Hero } from "@/components/hero";
import { MissionSection } from "@/components/section-mission";
import { RolesSection } from "@/components/section-roles";
import { ProcessSection } from "@/components/section-process";
import { StandardsSection } from "@/components/section-standards";
import { ServiceCategoriesSection } from "@/components/section-service-categories";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <Hero />
        <MissionSection />
        <ServiceCategoriesSection />
        <IndustriesServedSection />
        <FeaturesSection />
        <StandardsSection />
        <RolesSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
