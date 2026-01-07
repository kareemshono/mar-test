"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useTranslations } from "next-intl";
import { useState } from "react";


type Plan = {
  key: string;
  name: string;
  price: string;
  description: string;
  cta: string;
  color: string;
  icon: keyof typeof dynamicIconImports;
  popular?: boolean;
  features: string[];
};

type Props = {
  plan: Plan;
  index: number;
  onSelect:() => void;
};

const PlanCard = ({ plan, index,onSelect }: Props) => {
  const { key, name, price, description, cta, color, icon, popular, features } = plan;
  const [isToggled,setIsToggled] = useState(false)
const t = useTranslations("pricing")
  return (
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="relative"
    >
      {/* Popular Badge */}
      {popular && (
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className=" lg:w-40 px-5 py-1 bg-rose-500 text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 fill-white" />
            </motion.div>
           {t("popular")}
          </div>
        </motion.div>
      )}

      <Card
        className={cn(
          "p-6 h-full flex flex-col bg-white dark:bg-gray-900 border-2 transition-all duration-300 group relative overflow-hidden",
          popular
            ? "border-rose-500 shadow-xl shadow-rose-500/20 scale-105"
            : "border-gray-200 dark:border-gray-800 hover:border-rose-400"
        )}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex flex-col flex-1">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: color + "20" }}>
            <DynamicIcon name={icon} className="w-8 h-8" style={{ color }} />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {description}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline">
              <span className="text-2xl " style={{ color }}>
                {price}
              </span>
              {price !== "Custom" && (
                <span className="ml-2 text-gray-500 text-lg">/{t("month")}</span>
              )}
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-10 flex-1">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: color }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
            <Button
            onClick={onSelect}
              className={cn(
                "w-full h-12 text-base font-medium transition-all",
                popular
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
                  : "text-white"
              )}
              style={{
                backgroundColor: popular ? undefined : color,
              }}
            >
              {cta}
            </Button>
        </div>
      </Card>
   
    </motion.div>
  );
};

export default PlanCard;