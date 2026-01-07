"use client";

import {  motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MoveRight,
  Trophy,
  Gamepad2,
  Gift,
  Zap as ZapIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import DashboardHeader from "./DashboardHeader";
import DashboardMetricsCard from "./DashboardMetricsCard";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import TopPerformersCard from "./TopPerformersCard";
import DashboardBottomFeatureCard from "./DashboardBottomFeatureCard";

const activityCards = [
                    { icon: Gamepad2, value: "892", label: "Games" },
                    { icon: Gift, value: "456", label: "Rewards" },
                    { icon: ZapIcon, value: "1,499", label: "Points" },
                  ]

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const metrics = t.raw("metrics") as Array<{
    label: string;
    value: string;
    change: string;
    color: string;
    icon:keyof typeof dynamicIconImports;
  }>;
  const topPerformers = t.raw("top_performers") as Array<{
    name: string;
    users: number;
    change: number;
  }>;
  const dashboard_feature_cards = t.raw("dashboard_features") as Array<{
    type: "ai-insights" | "automation" | "export";
  title: string;
  description: string;
  icon: keyof typeof dynamicIconImports;
  button_text?: string;
  button_icon?: string;
  progress?: number;
  formats?: string[];
  }>

  const [automationPercent, setAutomationPercent] = useState(0);
  const automationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const duration = 2500;
          const target = 87;

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setAutomationPercent(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (automationRef.current) observer.observe(automationRef.current);
    return () => observer.disconnect();
  }, []);

  return (
      <div className="w-screen  bg-gray-50 dark:bg-gray-900/50">
        <Container>
            <section
          id="dashboard"
          className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-15 "
    >
      {/* HEADER  */}
     <DashboardHeader />

      <main className="max-w-7xl mx-auto mt-16 md:mt-20 space-y-16 md:space-y-20 lg:space-y-24">
        {/* === METRICS GRID === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
           
            return <DashboardMetricsCard key={i} i={i} label={m.label} value={m.value} change={m.change} color={m.color} icon={m.icon} />
          })}
        </div>

        {/* === TOP PERFORMERS + ACTIVITY PULSE === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="gap-0 p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <Trophy className="w-7 h-7 text-yellow-500" />
                  {t("top_performers_title")}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-rose-500 font-medium text-sm flex items-center gap-2 self-start sm:self-center"
                >
                  {t("view_all")} <MoveRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-2">
                {topPerformers.map((item, i) => <TopPerformersCard key={i} i={i} name={item.name} users={item.users} change={item.change} />)}
              </div>
            </Card>
          </motion.div>

          {/* Activity Pulse */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-rose-500 to-pink-600 text-white h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/20"
                    style={{ width: 160 + i * 80, height: 160 + i * 80 }}
                    animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
                  />
                  <span className="text-sm opacity-90">
                    {t("activity_pulse")}
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl  mb-2">2,847</div>
                <p className="text-sm opacity-90 mb-12">{t("actions_60s")}</p>

                <div className="grid grid-cols-3 mt-10 gap-4">
                  {activityCards.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <item.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
                      <div className="text-xl sm:text-2xl font-bold">
                        {item.value}
                      </div>
                      <div className="text-xs opacity-90">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* === BOTTOM FEATURE CARDS === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
          {dashboard_feature_cards.map((card,i) => <DashboardBottomFeatureCard key={i} index={i} card={card}  />)}
        </div>
      </main>
    </section>
      </Container>
      </div>
  );
}
