"use client"
import SidebarNavigation from "@/components/layout/navbar/SidebarNavigation";
import ContactUs from "@/components/sections/contactUs/ContactUs";
import Dashboard from "@/components/sections/dashboard/Dashboard";
import Faq from "@/components/sections/faq/Faq";
import Features from "@/components/sections/features/Features";
import Games from "@/components/sections/games/Games";
import Hero from "@/components/sections/hero/Hero";
import Integrations from "@/components/sections/integrations/Integrations";
import Loyalty from "@/components/sections/loyalty/Loyalty";
import Pricing from "@/components/sections/pricing/Pricing";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";


export default function Home() {
  const pathname = usePathname();
  const locale = useLocale();
  const isHomePage = pathname === "/" || pathname === `/${locale}` || pathname === ""
  return (
    <>
   {/* conditional sidebar render - depending on page  */}
    {  isHomePage ? <SidebarNavigation /> : ""  }       
     <Hero />
     <Features />
     <Loyalty />
     <Games />
     <Dashboard />
     <Integrations />
     <Pricing />
     <Faq />
     <ContactUs />
    </>
  );
}
