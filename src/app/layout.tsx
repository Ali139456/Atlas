import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Syne } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
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

const SCROLL_BOOT =
  `try{` +
  `if("scrollRestoration"in history)history.scrollRestoration="manual";` +
  `var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];` +
  `var reload=n&&n.type==="reload";` +
  `if(reload){` +
  `history.replaceState(null,"",location.pathname+location.search);` +
  `scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;` +
  `}else if(!location.hash||location.hash==="#"||location.hash==="#top"){` +
  `scrollTo(0,0);document.documentElement.scrollTop=0;` +
  `}` +
  `}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} h-full overflow-x-clip`}
      suppressHydrationWarning
    >
      <body
        id="top"
        className="site-body flex min-h-full max-w-[100vw] flex-col antialiased"
        suppressHydrationWarning
      >
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {SCROLL_BOOT}
        </Script>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
