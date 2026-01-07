"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
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
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Red Circle Logo Component
const RedCircleLogo = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-full h-full relative">
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  </div>
);

interface ScrollProgressProps {
  navbarHidden?: boolean;
}

export default function ScrollProgress({
  navbarHidden = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGlowTrail, setShowGlowTrail] = useState(false);
  const [prevNavbarHidden, setPrevNavbarHidden] = useState(false);

  const sections = [
    { name: "Home", icon: Home, id: "hero" },
    { name: "Features", icon: Star, id: "features" },
    { name: "Loyalty", icon: Trophy, id: "loyalty" },
    { name: "Games", icon: Gamepad2, id: "games" },
    { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { name: "Integrations", icon: Plug, id: "integrations" },
    { name: "Pricing", icon: DollarSign, id: "pricing" },
    { name: "FAQ", icon: HelpCircle, id: "faq" },
    { name: "Contact", icon: Mail, id: "contact" },
  ];

  // Trigger glow trail when navbar visibility changes
  useEffect(() => {
    if (navbarHidden !== prevNavbarHidden) {
      if (navbarHidden) {
        setShowGlowTrail(true);
        setTimeout(() => setShowGlowTrail(false), 1000);
      }
      setPrevNavbarHidden(navbarHidden);
    }
  }, [navbarHidden, prevNavbarHidden]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = document.querySelectorAll("section[id]");

      setIsVisible(window.scrollY >= 100);

      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled =
        windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      setScrollPercentage(Math.min(Math.round(scrolled), 100));

      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom =
          sectionTop + (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Progress Bar - Top */}
      <AnimatePresence>
        {navbarHidden && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 h-2 group/progress cursor-pointer hover:h-3 transition-all duration-300 pointer-events-auto z-[100]"
          >
            <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm" />

            <motion.div
              className="absolute inset-0 origin-left"
              style={{ scaleX }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#993EF9] via-[#FF1D57] to-[#993EF9]" />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Section dots - visible on hover */}
            <div className="absolute inset-0 opacity-50 group-hover/progress:opacity-100 transition-opacity duration-300 pointer-events-auto">
              {sections.map((section, idx) => {
                const position = (idx / (sections.length - 1)) * 100;
                const isActive = idx === activeSection;

                return (
                  <TooltipProvider key={idx} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          className="absolute -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer"
                          style={{ left: `${position}%`, top: "50%" }}
                          onClick={() => scrollToSection(section.id)}
                          whileHover={{ scale: 1.5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? "bg-[#FF1D57] shadow-lg shadow-[#FF1D57]/60"
                                : "bg-white/90 hover:bg-[#993EF9] hover:shadow-md hover:shadow-[#993EF9]/50"
                            }`}
                            style={
                              !isActive
                                ? {
                                    boxShadow:
                                      "0 0 4px rgba(255, 255, 255, 0.8)",
                                  }
                                : undefined
                            }
                            animate={
                              isActive
                                ? {
                                    scale: [1, 1.3, 1],
                                    boxShadow: [
                                      "0 0 8px rgba(255, 29, 87, 0.6)",
                                      "0 0 15px rgba(255, 29, 87, 0.9)",
                                      "0 0 8px rgba(255, 29, 87, 0.6)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-[#993EF9] text-white border-none text-xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <section.icon className="w-3 h-3" />
                          <span>{section.name}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>

            {/* Percentage tooltip */}
            <motion.div className="absolute left-1/2 -translate-x-1/2 top-3 px-2 py-1 bg-[#993EF9] text-white rounded text-[10px] opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none">
              <span className="font-semibold">{scrollPercentage}%</span>
              <div className="absolute left-1/2 -translate-x-1/2 -top-0.5 rotate-45 w-1 h-1 bg-[#993EF9]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ GLOWING TRAIL - Shows when O logo flies from navbar to sidebar */}
      <AnimatePresence>
        {showGlowTrail && navbarHidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[95]"
          >
            {/* Curved glow path */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 150 40 Q 80 200, 40 400"
                fill="none"
                stroke="url(#glowGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0.5, 0] }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient
                  id="glowGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF1D57" stopOpacity="1" />
                  <stop offset="50%" stopColor="#993EF9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF1D57" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Particle sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#FF1D57] shadow-lg shadow-[#FF1D57]/50"
                initial={{
                  x: 150,
                  y: 40,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: [150, 80, 40],
                  y: [40, 200, 400],
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Glow burst at destination */}
            <motion.div
              className="absolute left-[40px] top-[400px] w-20 h-20 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,29,87,0.4) 0%, rgba(153,62,249,0.2) 50%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📍 SIDE NAVIGATION - With Flying O Logo */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
          >
            {/* O Logo - Flies in from navbar */}
            <AnimatePresence>
              {navbarHidden && (
                <motion.div
                  initial={{
                    scale: 0.5,
                    opacity: 0,
                    x: 100,
                    y: -350,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: [0, 360, 0],
                  }}
                  exit={{
                    scale: 0.5,
                    opacity: 0,
                    x: 100,
                    y: -350,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="relative group/redlogo cursor-pointer mb-4"
                  whileHover={{
                    scale: 1.15,
                    rotate: 360,
                  }}
                >
                  <RedCircleLogo className="w-12 h-12" />

                  {/* Interactive pulsing glow */}
                  <motion.div
                    className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#FF1D57] to-[#993EF9] blur-xl opacity-40 group-hover/redlogo:opacity-70"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Rotating ring on hover */}
                  <motion.div
                    className="absolute inset-[-6px] rounded-full opacity-0 group-hover/redlogo:opacity-100 transition-opacity"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #FF1D57, #993EF9, #00D4FF, #FF1D57)",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute inset-[2px] rounded-full bg-transparent" />
                  </motion.div>

                  {/* Sparkle particles on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover/redlogo:opacity-100"
                    transition={{ duration: 0.3 }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-[#41FF00]"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          x: [0, Math.cos((i * Math.PI) / 2) * 30],
                          y: [0, Math.sin((i * Math.PI) / 2) * 30],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Section Navigation Icons */}
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === idx;

              return (
                <TooltipProvider key={idx} delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        onClick={() => scrollToSection(section.id)}
                        className="relative group/nav"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute -left-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#993EF9] rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: isActive ? 10 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-[#993EF9] text-white shadow-lg shadow-[#993EF9]/30"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                          animate={
                            isActive
                              ? {
                                  boxShadow: [
                                    "0 4px 15px rgba(153, 62, 249, 0.3)",
                                    "0 6px 20px rgba(153, 62, 249, 0.5)",
                                    "0 4px 15px rgba(153, 62, 249, 0.3)",
                                  ],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.div>

                        {isActive && (
                          <motion.div
                            className="absolute -right-1 -top-1 w-2 h-2 bg-[#41FF00] rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        )}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#993EF9] text-white border-none"
                    >
                      <span className="text-sm">{section.name}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 MOBILE NAVIGATION */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          >
            <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="px-4 py-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {sections.map((section, idx) => {
                    const isActive = activeSection === idx;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => scrollToSection(section.id)}
                        whileTap={{ scale: 0.8 }}
                      >
                        <motion.div
                          className={`rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-6 h-1.5 bg-[#993EF9]"
                              : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600"
                          }`}
                          animate={
                            isActive
                              ? {
                                  boxShadow: [
                                    "0 0 5px rgba(153, 62, 249, 0.5)",
                                    "0 0 10px rgba(153, 62, 249, 0.8)",
                                    "0 0 5px rgba(153, 62, 249, 0.5)",
                                  ],
                                }
                              : {}
                          }
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    {(() => {
                      const Icon = sections[activeSection]?.icon;
                      return Icon ? (
                        <Icon className="w-4 h-4 text-[#993EF9]" />
                      ) : null;
                    })()}
                    <span className="font-medium">
                      {sections[activeSection]?.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#993EF9] text-white flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </motion.button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-full left-0 right-0 mb-2 mx-4 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {sections.map((section, idx) => {
                        const Icon = section.icon;
                        const isActive = activeSection === idx;

                        return (
                          <motion.button
                            key={idx}
                            onClick={() => {
                              scrollToSection(section.id);
                              setMobileMenuOpen(false);
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
                              isActive
                                ? "bg-[#993EF9] text-white"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium">
                              {section.name}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
