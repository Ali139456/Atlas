import { ContactSection } from "@/components/contact-section";
import { FeaturesSection } from "@/components/section-features";
import { FinalCtaSection } from "@/components/section-final-cta";
import { IndustriesServedSection } from "@/components/section-industries-served";
import { Hero } from "@/components/hero";
import { WhyChooseUsSection } from "@/components/section-mission";
import { RolesSection } from "@/components/section-roles";
import { ServiceCategoriesSection } from "@/components/section-service-categories";
import { TestimonialsSection } from "@/components/section-testimonials";
import { ProofStrip } from "@/components/proof-strip";
import { TrustMarquee } from "@/components/trust-marquee";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="site-main site-main--home section-bg">
        <Hero />
        <TrustMarquee />
        <ProofStrip />
        <FeaturesSection />
        <ServiceCategoriesSection />
        <IndustriesServedSection />
        <WhyChooseUsSection />
        <RolesSection />
        <TestimonialsSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
