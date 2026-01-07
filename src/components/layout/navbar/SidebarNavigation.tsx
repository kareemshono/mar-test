"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Home,
  Star,
  Trophy,
  Gamepad2,
  LayoutDashboard,
  Plug,
  DollarSign,
  HelpCircle,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const sections = [
  "hero",
  "features",
  "loyalty",
  "games",
  "dashboard",
  "integrations",
  "pricing",
  "faq",
  "contact",
];
const icons = [
  Home,
  Star,
  Trophy,
  Gamepad2,
  LayoutDashboard,
  Plug,
  DollarSign,
  HelpCircle,
  Mail,
];
const sectionNames = [
  "Home",
  "Features",
  "Loyalty",
  "Games",
  "Dashboard",
  "Integrations",
  "Pricing",
  "FAQ",
  "Contact",
];

export default function SidebarNavigation() {
  const { activeSection } = useActiveSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTrail, setShowTrail] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Safe RTL detection
  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (scrolled && !isScrolled) {
        setShowTrail(true);
        setTimeout(() => setShowTrail(false), 1400);
      }
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isScrolled) return null;

  return (
    <>
      {/* TOP GRADIENT PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[999] pointer-events-none">
        <div className="absolute inset-0 bg-gray-200/30 dark:bg-gray-800/30 backdrop-blur-sm" />
        <motion.div className="absolute inset-0 origin-left" style={{ scaleX }}>
          <div className="h-full bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* CURVED GLOWING TRAIL + SPARKLES — FIXED & BEAUTIFUL */}
      {showTrail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[998]"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <motion.path
              d={
                isRtl
                  ? "M 850 40 Q 920 200 960 400"
                  : "M 150 40 Q 80 200 40 400"
              }
              fill="none"
              stroke="url(#glowTrail)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.8 }}
              animate={{ pathLength: 1, opacity: [0.8, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="glowTrail" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF1D57" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#993EF9" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF1D57" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Sparkles following the curve */}
          {[...Array(9)].map((_, i) => {
            const t = i / 8;
            const startX = isRtl ? 850 : 150;
            const endX = isRtl ? 960 : 40;
            const x = startX + (endX - startX) * t;
            const y = 40 + 360 * t * t; // parabolic fall

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-rose-500 shadow-lg shadow-rose-500/70"
                initial={{ x: startX, y: 40, scale: 0, opacity: 0 }}
                animate={{ x, y, scale: [0, 2, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.3, delay: i * 0.09, ease: "easeOut" }}
              />
            );
          })}
        </motion.div>
      )}

      {/* MAIN SIDEBAR  */}
      <motion.div
        initial={{ x: isRtl ? 80 : -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3",
          isRtl ? "right-6" : "left-6"
        )}
      >
        {/* Flying Logo */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -300 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-4"
        >
          <Image
            src="/images/sidebarLogo.png"
            width={44}
            height={44}
            alt="Logo"
            className="mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {icons.map((Icon, i) => {
          const isActive = activeSection === i;

          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => scrollTo(sections[i])}
                  className="group  relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActive"
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-full",
                        isRtl ? "-right-3" : "-left-3"
                      )}
                    />
                  )}

                  <div
                    className={cn(
                      "w-10 h-10 rounded-2xl cursor-pointer flex shadow-md items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-purple-600 text-white shadow-xl shadow-purple-500/40"
                        : "bg-white/90 dark:bg-slate-800 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:bg-purple-50 hover:text-purple-600"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </button>
              </TooltipTrigger>

              <TooltipContent
                side={isRtl ? "left" : "right"}
                className="bg-purple-600 text-white border-none font-medium"
              >
                {sectionNames[i]}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </motion.div>
    </>
  );
}
