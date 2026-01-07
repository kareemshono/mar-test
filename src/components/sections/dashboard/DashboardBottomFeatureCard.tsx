"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type FeatureCard = {
  type: "ai-insights" | "automation" | "export";
  title: string;
  description: string;
  icon: keyof typeof dynamicIconImports;
  button_text?: string;
  button_icon?: string;
  progress?: number;
  formats?: string[];
};

type Props = {
  card: FeatureCard;
  index: number;
};

const DashboardBottomFeatureCard = ({ card, index }: Props) => {
  const { type, title, description, icon, button_text, button_icon, progress, formats } = card;

  const config = {
    "ai-insights": {
      gradient: "from-purple-600 to-purple-800",
      textColor: "text-white",
      iconBg: "bg-white/20",
      borderColor:"#ffffff4b",
      buttonBg: "bg-white/20 hover:bg-white/30",
      hasSpinningBg: true,
    },
    automation: {
      gradient: "",
      textColor: "text-gray-800 dark:text-white",
      iconBg: "bg-green-500/10",
      borderColor: "#41FF00",
      spinIcon: true,
    },
    export: {
      gradient: "from-gray-900 to-black",
      textColor: "text-white",
      iconBg: "bg-white/10",
      borderColor:"#ffffff4b",
      buttonBg: "bg-white/10 hover:bg-white/20",
      hasGrid: true,
    },
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative overflow-hidden p-6 sm:p-8 h-full",
          config.gradient && `bg-gradient-to-br ${config.gradient}`,
          !config.gradient && "bg-white dark:bg-gray-900",
          config.borderColor && "border-2",
          config.textColor
        )}
        style={config.borderColor ? { borderColor: config.borderColor } : undefined}
      >
        {/* AI: Spinning background bot */}
        {type === "ai-insights" && (
          <motion.div
            className="absolute top-4 right-4 text-9xl opacity-10 select-none pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <DynamicIcon name="bot" className="w-32 h-32 sm:w-48 sm:h-48" />
          </motion.div>
        )}

        {/* Export: Grid overlay */}
        {type === "export" && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}

        <div className="relative z-10">
          {/* Icon */}
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", config.iconBg)}>
            {type === "automation" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <DynamicIcon name={icon} className="w-8 h-8" style={{ color: "#41FF00" }} />
              </motion.div>
            ) : (
              <DynamicIcon name={icon} className="w-7 h-7" />
            )}
          </div>

          <h3 className="text-2xl font-semibold mb-3">{title}</h3>
          <p className={cn("text-sm mb-8", type === "export" ? "opacity-90" : `text-gray-600 ${config.textColor} dark:text-gray-200`)}>
            {description}
          </p>

          {/* Footer */}
          {button_text && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                config.buttonBg
              )}
            >
              {button_text}
              {button_icon && <DynamicIcon name={icon} className="w-5 h-5" />}
            </motion.button>
          )}

          {progress !== undefined && (
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#41FF00" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />
              </div>
              <span style={{ color: "#41FF00" }} className="text-2xl font-bold w-16 text-right">
                {progress}%
              </span>
            </div>
          )}

          {formats && (
            <div className="grid grid-cols-3 gap-3">
              {formats.map((fmt) => (
                <motion.button
                  key={fmt}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn("py-3 rounded-xl text-sm font-medium transition-colors", config.buttonBg)}
                >
                  {fmt}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardBottomFeatureCard;