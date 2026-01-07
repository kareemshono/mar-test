"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import PlanCard from "./PlanCard";
import ColoredTitle from "@/components/coloredTitle/ColoredTitle";
import { useState } from "react";
import PlanDialog from "./PlanDialog";


export default function Pricing() {
  const t = useTranslations("pricing");
  const [isOpen,setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);


const handleOpenDialog = (plan:{name:string,price:string}) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedPlan(null);
  };
const plans = t.raw("plans") as any[];

  return (
    <>
      <div className="w-screen bg-gray-50 dark:bg-gray-900/50">
          <Container>
      <section
      id="pricing"
      className="py-20 px-10 lg:px-8 "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
        <ColoredTitle json_key="pricing"  className="text-3xl/15 sm:text-3xl md:text-5xl lg:text-5xl/20"/>
          <p className="text-lg lg:text-xl/8 font-medium  text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mx-3 lg:mx-10">
       {plans.map((plan, idx) => (
                <PlanCard onSelect={() => handleOpenDialog(plan)} key={plan.key} plan={plan} index={idx} />
              ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t("trial")}
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span>{t("cancel")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span>{t("support")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span>{t("guarantee")}</span>
            </div>
          </div>
        </motion.div>
      </div>
              <PlanDialog plan={selectedPlan} isOpen={isOpen} onClose={() => handleCloseDialog()} />
    </section>
    </Container>
      </div>
      </>
    
  
  );
}
