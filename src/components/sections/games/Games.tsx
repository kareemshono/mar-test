"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SpinWheel from "./SpinWheel";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import GamesHeader from "./GamesHeader";
import GamesCard from "./GamesCard";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import GamesStatCard from "./GamesStatCard";

export default function Games() {
  const t = useTranslations("games");
  const cards = t.raw("cards") as Array<{
    title: string;
    description: string;
    color: string;
    icon: keyof typeof dynamicIconImports;
  }>;
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
   <Container>
     <section
      id="games"
      className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Header */}
        <GamesHeader />
      {/* Responsive Two Columns => Stacks on Mobile */}
      <main className="max-w-7xl mx-auto mt-12 lg:mt-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">
          {/* LEFT: Cards */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-xl order-2   lg:order-1"
          >
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:ml-7 lg:grid-cols-2 gap-5 lg:gap-5 sm:gap-6">
              {cards.map((game, idx) => {
                return <GamesCard key={idx} idx={idx} title={game.title} description={game.description} color={game.color} icon={game.icon}  />
              })}
            </div>
          </motion.div>

          {/* RIGHT: Spin Wheel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 w-full flex justify-center"
          >
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <SpinWheel />
            </div>
          </motion.div>
        </div>

        {/* Stats — Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20 lg:mt-28 max-w-6xl mx-auto">
          {stats.map((stat, i) => <GamesStatCard key={i} i={i} value={stat.value} label={stat.label} /> )}
        </div>
      </main>
    </section>
   </Container>
  );
}
