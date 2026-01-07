"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({
  title = "Loading...",
  subtitle = "Please wait while we prepare everything for you",
  size = "md",
  className,
  ...props
}: LoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeConfig = {
    sm: { container: "size-20", titleClass: "text-sm/tight font-medium", subtitleClass: "text-xs/relaxed", spacing: "space-y-2", maxWidth: "max-w-48" },
    md: { container: "size-32", titleClass: "text-base/snug font-medium", subtitleClass: "text-sm/relaxed", spacing: "space-y-3", maxWidth: "max-w-56" },
    lg: { container: "size-40", titleClass: "text-lg/tight font-semibold", subtitleClass: "text-base/relaxed", spacing: "space-y-4", maxWidth: "max-w-64" },
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-8 p-8", className)} {...props}>
      {/* PURE CSS SPINNER — starts immediately */}
      <div className={cn("relative", config.container)}>
        {/* Ring 1 */}
        <div className="absolute inset-0 animate-spin-slow rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, #FF2056 90deg, transparent 180deg)`,
            mask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
            WebkitMask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
            opacity: 0.8,
          }}
        />

        {/* Ring 2 */}
        <div className="absolute inset-0 animate-spin-medium rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, #FF2056, #BD00BD 240deg, transparent 360deg)`,
            mask: `radial-gradient(circle at 50% 50%, transparent 42%, #FF2056 44%, black 48%, transparent 50%)`,
            WebkitMask: `radial-gradient(circle at 50% 50%, transparent 42%, #FF2056 44%, black 48%, transparent 50%)`,
            opacity: 0.9,
          }}
        />

        {/* Counter rotating ring */}
        <div className="absolute inset-0 animate-spin-fast rounded-full"
          style={{
            background: `conic-gradient(from 180deg, transparent 0deg, #FF2056 45deg, transparent 90deg)`,
            mask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
            WebkitMask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
            opacity: 0.35,
          }}
        />
      </div>

      {/* Text — fades in after mount */}
      <motion.div
        className={cn("text-center", config.spacing, config.maxWidth)}
        initial={{ opacity: 0, y: 12 }}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <motion.h1 className={cn(config.titleClass, "text-white/90 font-medium tracking-wide leading-[1.15] antialiased")}
          animate={mounted ? { opacity: [0.9, 0.7, 0.9] } : false}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {title}
        </motion.h1>

        <motion.p className={cn(config.subtitleClass, "text-white/60 text-sm font-normal tracking-[-0.01em] leading-[1.45] antialiased")}
          initial={{ opacity: 0, y: 8 }}
          animate={mounted ? { opacity: 1, y: 0 } : false}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.span
            animate={mounted ? { opacity: [0.6, 0.4, 0.6] } : false}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {subtitle}
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}