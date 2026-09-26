import type { Metadata, Viewport } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ShopBackdrop from "@/components/theme/ShopBackdrop";
import EmberField from "@/components/theme/EmberField";
import { siteMeta } from "@/lib/content";

// Fraunces — a quirky, high-contrast display serif common in premium food branding.
// Used for all headings and the wordmark. Variable axes give it the soft "wonk" character.
const displayFont = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-display",
});

// Fraunces italic doubles as the script/tagline accent, keeping the type system to two families.
const scriptFont = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["SOFT", "WONK"],
  variable: "--font-script",
});

// Sora — clean geometric sans for body copy, nav and UI.
const bodyFont = Sora({
  subsets: ["latin"],
  variable: "--font-body",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbfdff",
};

export const metadata: Metadata = {
  title: {
    default: siteMeta.titleDefault,
    template: "%s | Yianni's on Hindley Street",
  },
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.titleDefault,
    description: siteMeta.description,
    siteName: "Yianni's on Hindley Street",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${displayFont.variable} ${scriptFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col">
        <StructuredData />
        <GoogleAnalytics />
        {/* The scene everything else is layered over — see globals.css */}
        <ShopBackdrop />
        {/* Live embers over everything (sending an order sets off a fountain) */}
        <EmberField />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-chalk focus:px-4 focus:py-2 focus:text-cobalt"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-4 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
