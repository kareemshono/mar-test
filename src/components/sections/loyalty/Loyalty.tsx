"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import LoyaltyHeader from "./LoyaltyHeader";
import LoyaltyCard from "./LoyaltyCard";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import LoyaltyRewardCard from "./LoyaltyRewardCard";

export default function Loyalty() {
  const t = useTranslations("loyalty");
  const locale = useLocale();
  const isRtl = locale === "ar" ;

  const cards = t.raw("loyalty_cards") as Array<{
    title: string;
    description: string;
    icon: keyof typeof dynamicIconImports;
  }>;
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  
  const rewards = t.raw("rewards") as Array<{ name: string; points: number, icon:keyof typeof dynamicIconImports }>;

  const activity = t.raw("activity") as Array<{
    action: string;
    points: number;
    time: string;
    color: string;
  }>;

  return (
    <div className="w-screen bg-gray-50 dark:bg-gray-900/50">
      <Container >
        <section
          id="loyalty"
          className=" py-20 px-6 lg:px-15 "
        >
        <div className="w-full mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN — Text & Cards */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={cn("order-2 lg:order-1", isRtl && "lg:ml-0 lg:mr-10")}
          >
            <LoyaltyHeader />

            <div className="space-y-6">
              {/* mapping cards  */}
              {cards.map((card, i) => {
            
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Loyalty Card  */}
                    <LoyaltyCard icon={card.icon} title={card.title} description={card.description} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        {/* RIGHT COLUMN — Rewards Panel */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative order-1 lg:order-2"
        >
          <Card className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl relative z-10">
            <div className="space-y-8">
              {/* Points Progress */}
              <div className="group/progress">
                <div
                  className={cn(
                    "flex justify-between items-center mb-3",
                    isRtl && "flex-row"
                  )}
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t("points_earned")}
                  </span>
                  <span className="text-md text-purple-600">
                    {t("points_bonus")}
                  </span>
                </div>

                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white30 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Tier Badges */}
              <div className="grid grid-cols-3 gap-5">
                {["Bronze", "Silver", "Gold"].map((tier, i) => {
                  const colors = ["#CD7F32", "#C0C0C0", "#FFD700"];
                  const bg = [
                    "rgba(205,127,50,0.15)",
                    "rgba(192,192,192,0.15)",
                    "rgba(255,215,0,0.15)",
                  ];
                  return (
                    <motion.div
                      key={tier}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-xl text-center relative overflow-hidden ${
                        i === 2 ? "opacity-50" : ""
                      }`}
                      style={{ backgroundColor: bg[i] }}
                    >
                      <div
                        className="w-8 h-8 lg:w-14  lg:h-14 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: colors[i] }}
                      >
                        <Award className="lg:w-8 lg:h-8 text-white" />
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: i < 2 ? colors[i] : undefined }}
                      >
                        {tier}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

             
              <div>
                <h4
                  className={cn(
                    "text-sm font-medium text-gray-700 dark:text-gray-300 mb-4",
                    isRtl && "text-right"
                  )}
                >
                  {t("available_rewards")}
                </h4>
                <div className="space-y-3">
                  {/* rewards mapping  */}
                  {rewards.map((reward, i) => {
                
                    const colors = [
                      "#9333EA",
                      "#B565FF",
                      "#7C2DD4",
                      "#A855F7",
                      "#C084FC",
                      "#9333EA",
                      "#7C3AED",
                    ];
                    return <LoyaltyRewardCard key={i} i name={reward.name} color={colors[i]} icon={reward.icon} points={reward.points} />
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4
                  className={cn(
                    "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3",
                    isRtl && "text-right"
                  )}
                >
                  {t("recent_activity")}
                </h4>
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        isRtl && "flex-row"
                      )}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: a.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {a.action}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-bold" style={{ color: a.color }}>
                        {a.points}
                      </span>
                      <span className="text-gray-500">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Floating Stats  */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={cn(
              "absolute -top-16 bg-rose-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-30",
              isRtl ? "-left-5 lg:-left-8" : "-right-2 lg:-right-8"
            )}
          >
            <div className="text-2xl font-medium">2.5x</div>
            <div className="text-sm opacity-90">{t("engagement")}</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            className={cn(
              "absolute -bottom-16 bg-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-30",
              isRtl ? "-right-8" : "-left-3"
            )}
          >
            <div className="text-3xl font-bold">89%</div>
            <div className="text-sm opacity-90">{t("retention")}</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className={cn(
              "absolute top-1/3 bg-green-500 text-white px-5 py-3 rounded-xl shadow-2xl z-30",
              isRtl ? "left-0 lg:left-[-48px]" : "-top-10 lg:top-100  lg:-right-12"
            )}
          >
            <div className="text-2xl font-bold">+45%</div>
            <div className="text-xs opacity-90">{t("revenue")}</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-center"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`p-8 bg-white dark:bg-gray-900 relative rounded-xl shadow-md border border-gray-100 dark:border-gray-800 ${i === 0 ? "dark:hover:border-rose-500" : i === 1  ? "dark:hover:border-purple-600" : "dark:hover:border-[#41FF00]"}`}
          >
            {/* corner-glow  */}
            <div className={`absolute right-3 top-3 w-4 h-4 animate-pulse rounded-full ${i === 0 ? "bg-rose-500":i === 1 ? "bg-purple-600":"bg-[#41FF00]"}`}></div>
          
            <div
              className={`text-3xl mb-2  ${
                i === 0
                  ? "text-rose-500 "
                  : i === 1
                  ? "text-purple-600"
                  : "text-[#41FF00]"
              }`}
            >
              {s.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
   </Container>
    </div>
   
  );
}
