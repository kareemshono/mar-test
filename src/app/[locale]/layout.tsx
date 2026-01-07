import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import "../globals.css";
import { NextIntlClientProvider } from "next-intl";

import Navbar from "@/components/layout/navbar/Navbar";
import FloatingMessage from "@/components/layout/navbar/FloatingMessage";
import Footer from "@/components/layout/footer/Footer";
import ThemeProviderClient from "@/components/layout/ThemeProviderClient";
import ScrollToTop from "@/components/layout/navbar/ScrollToTop";
import CursorEffect from "@/components/layout/cursor/CursorEffect";
import { Toaster } from "sonner";
import LoadingPage from "./LoadingPage";
import { TransitionProvider } from "@/components/transitionProvider/TransitionProvider";
import { LenisProvider } from "@/components/lenis/LenisProvider";



// Dynamic Metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    // Title & Description (Localized)
    title: {
      default: isAr ? "ماريو | منصة التفاعل والجيمنج للعملاء" : "Mario | Customer Engagement & Gamification Platform",
      template: "%s | Mario",
    },
    description: isAr
      ? "ارفع تفاعل عملائك والولاء والإيرادات بمنصة جيمنج شاملة: نقاط، شارات، لوحات صدارة، ألعاب، ومكافآت."
      : "Boost customer engagement, loyalty & revenue with a complete gamification platform: points, badges, leaderboards, games & rewards.",

    // Base URL
    metadataBase: new URL("https://mario-app.com"), 

    // Open Graph / Facebook
    openGraph: {
      title: isAr ? "ماريو – منصة التفاعل والجيمنج المتكاملة" : "Mario – Complete Gamification Platform",
      description: isAr
        ? "حوّل عملاءك إلى لاعبين مخلصين مع نظام نقاط ومكافآت وألعاب تفاعلية."
        : "Turn customers into loyal players with points, rewards, leaderboards, and interactive games.",
      url: "https://mario-app.com",
      siteName: "Mario",
      images: [
        {
          url: "/images/og-image.png", 
          width: 1200,
          height: 630,
          alt: "Mario Gamification Platform",
        },
      ],
      locale: isAr ? "ar_SY" : "en_US",
      type: "website",
    },

    // Twitter / X
    twitter: {
      card: "summary_large_image",
      title: isAr ? "ماريو – جيمنج للعملاء" : "Mario – Gamification for Customers",
      description: isAr
        ? "نظام ولاء ومكافآت وألعاب يزيد التفاعل والاحتفاظ بالعملاء"
        : "Loyalty, rewards & games that boost engagement and retention",
      images: ["/images/og-image.png"],
    },


    icons: {
      icon: [
        { url: "/images/favicon.ico" },
        { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { rel: "icon", url: "/images/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
        { rel: "icon", url: "/images/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },

    // Robots & SEO
    robots: {
      index: true,
      follow: true,
    },

    // Canonical & Alternate URLs
    alternates: {
      canonical: "/images/",
      languages: {
        en: "/images/en",
        ar: "/images/ar",
      },
    },

    // Optional: PWA manifest
    manifest: "/images/site.webmanifest",
  };
}


type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering + set locale
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={` antialiased dark:bg-slate-950 overflow-x-hidden`}>   
        <NextIntlClientProvider>
          <ThemeProviderClient>
            <LenisProvider>
            <TransitionProvider>
            <LoadingPage />
             <Navbar />
             {/* ------------ */}
              {/* SIDEBAR COMPONENT IS IMPORTED IN page.tsx FOR HOOKS USAGE  */}
             {/* ------------ */}
            <FloatingMessage />
            <ScrollToTop />
              <main className="min-h-svh">{children}</main>
            <CursorEffect />
            <Footer />
            <Toaster />
            </TransitionProvider>
            </LenisProvider>
          </ThemeProviderClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

