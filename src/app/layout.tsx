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
    default: "Atlas Global Finance | Finance and Accounting Outsourcing",
    template: "%s | Atlas Global Finance",
  },
  description:
    "Finance and accounting outsourcing with real estate expertise. AP, AR, bookkeeping, property accounting, and reporting for US, Canada, UK, and Australia.",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
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
