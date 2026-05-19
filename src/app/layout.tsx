import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Atlas Global Finance | Virtual Bookkeeping & Reporting",
    template: "%s | Atlas Global Finance",
  },
  description:
    "Accounting outsourcing for AP, AR, bookkeeping, payroll, reconciliations, and financial reporting. QuickBooks, Xero, and NetSuite for US businesses.",
  keywords: [
    "accounting outsourcing",
    "accounts payable",
    "accounts receivable",
    "bookkeeping services",
    "payroll processing",
    "financial reporting",
    "QuickBooks",
    "Xero",
    "NetSuite",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-clip`}>
      <body id="top" className="site-body flex min-h-full max-w-[100vw] flex-col antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
