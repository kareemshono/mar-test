"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import DynamicIcon from "@/components/icons/DynamicIcon";

interface AboutCardProps {
    icon:keyof typeof dynamicIconImports;
  title: string | React.ReactNode; // Supports rich text with <br />
  className?: string;
}

export default function AboutCard({ icon, title, className }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={cn("h-full", className)}
    >
      <Card className="gap-2 space-y-3 p-4 sm:p-6 lg:p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-rose-500 transition-all group h-full">
        <DynamicIcon name={icon} className="w-10 h-10 text-rose-600 bg-gray-100 dark:bg-gray-800/40 p-2 rounded-md" />
        <p className="text-base sm:text-sm mb-2 text-slate-900 dark:text-neutral-300">
          {title}
        </p>
      </Card>
    </motion.div>
  );
}