import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Syne } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
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
    default: "Atlas Global Finance | Smarter Accounting. Greater Efficiency.",
    template: "%s | Atlas Global Finance",
  },
  description:
    "Technology-driven accounting operations partner. Experienced professionals, AI-assisted workflows, and efficient financial operations for HOA, restaurants, and growing businesses.",
  keywords: [
    "accounting operations",
    "technology-enabled accounting",
    "accounts payable",
    "bank reconciliation",
    "general ledger",
    "HOA accounting",
    "restaurant accounting",
    "AI-assisted workflows",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

const SCROLL_BOOT =
  `try{` +
  `var t=localStorage.getItem("theme");` +
  `if(t==="light")document.documentElement.setAttribute("data-theme","light");` +
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
        <ThemeProvider>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
