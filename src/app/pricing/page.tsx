import type { Metadata } from "next";
import Link from "next/link";
import { PricingSection } from "@/components/section-pricing";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flexible monthly outsourcing plans for bookkeeping, AP/AR, payroll, and controller support. Transparent flat-rate pricing.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="site-main">
        <div className="pricing-page-intro site-container relative z-10">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <ol className="service-breadcrumb-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="service-breadcrumb-sep" aria-hidden>
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li className="service-breadcrumb-current" aria-current="page">
                <span>Pricing</span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="pricing-page-section">
          <PricingSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
