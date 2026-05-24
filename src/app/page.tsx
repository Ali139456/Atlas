import { ContactSection } from "@/components/contact-section";
import { FeaturesSection } from "@/components/section-features";
import { IndustriesServedSection } from "@/components/section-industries-served";
import { Hero } from "@/components/hero";
import { WhyChooseUsSection } from "@/components/section-mission";
import { RolesSection } from "@/components/section-roles";
import { ServiceCategoriesSection } from "@/components/section-service-categories";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="site-main section-bg">
        <Hero />
        <FeaturesSection />
        <ServiceCategoriesSection />
        <IndustriesServedSection />
        <WhyChooseUsSection />
        <RolesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
