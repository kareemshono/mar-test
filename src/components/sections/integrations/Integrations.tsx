"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import IntegrationsHeader from "./IntegrationsHeader";
import FeaturedPartnerCard from "./FeaturedPartnerCard";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import FutureIntegrationCard from "./FutureIntegrationCard";
import DeveloperApiSection from "./DeveloperApiSection";

export default function Integrations() {
  const t = useTranslations("integrations");
  const featuredPartners = t.raw("featuredPartners") as Array<{
    tag: string;
    title: string;
    description: string;
    status: string;
    color:string;
    logo:string;
  }>;
  const futureIntegrations = t.raw("futureIntegrations") as Array<{
    name: string;
    description: string;
    icon:keyof typeof dynamicIconImports;
    color:string;
  }>;


  return (
    <div className="w-screen  bg-gray-50 dark:bg-gray-900/50">
          <Container>
          <section
      id="integrations"
      className="py-20 px-10 lg:px-5  relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <IntegrationsHeader />

        <div className="px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-2xl  mb-10  lg:ml-4 lg:mb-12 text-center lg:text-left rtl:text-right"
          >
            <span className="text-rose-500">{t("featured")}</span>{" "}
            {t("partners")}
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 max-w-6xl mx-auto">
            {featuredPartners.map((partner, i) => <FeaturedPartnerCard key={partner.title} i={i} title={partner.title}
            description={partner.description} tag={partner.tag} status={partner.status}
            color={partner.color} logo={partner.logo} />)}
          </div>
        </div>

        {/* Future Integrations — FULLY RESPONSIVE */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-2xl  mb-10 lg:ml-4 lg:mb-12 text-center lg:text-left rtl:text-right"
          >
            {t("connect_with_title")}
            <span className="text-rose-500"> {t("popular_tools")}</span>
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-5 max-w-6xl mx-auto">
            {futureIntegrations.map((item, i) => <FutureIntegrationCard key={i} i={i} name={item.name}
            color={item.color} description={item.description} icon={item.icon} />)}
          </div>
        </div>

        {/* Developer Api Section  */}
        <DeveloperApiSection />
      </div>
    </section>
    </Container>
    </div>

  );
}
