import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PricingSection } from "@/components/section-pricing";
import { SiteFooterServer } from "@/components/site-footer-server";
import { SiteHeaderServer } from "@/components/site-header-server";
import { getPublicPricingContent } from "@/lib/cms/public-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flexible monthly outsourcing plans for bookkeeping, AP/AR, payroll, and controller support. Transparent flat-rate pricing.",
};

export default async function PricingPage() {
  const pricing = await getPublicPricingContent();

  return (
    <>
      <SiteHeaderServer />
      <main className="site-main section-bg">
        <div className="pricing-page-intro site-container relative z-10">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <ol className="service-breadcrumb-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="service-breadcrumb-sep" aria-hidden>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </li>
              <li className="service-breadcrumb-current" aria-current="page">
                <span>Pricing</span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="pricing-page-section">
          <PricingSection {...pricing} />
        </div>
      </main>
      <SiteFooterServer />
    </>
  );
}
