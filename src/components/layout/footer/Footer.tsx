"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Trophy, Star, Sparkles, Zap, Gift, Target, ExternalLink } from "lucide-react";
import Image from "next/image";
import Logo from "../navbar/Logo";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { usePageTransition } from "@/components/transitionProvider/TransitionProvider";

const floatingIcons = [
  { Icon: Trophy, color: "#FF1D57" },
  { Icon: Star, color: "#993EF9" },
  { Icon: Sparkles, color: "#FF1D57" },
  { Icon: Zap, color: "#993EF9" },
  { Icon: Gift, color: "#FF1D57" },
  { Icon: Target, color: "#993EF9" },
];

const footerLinks = {
  company: ["about", "blog", "contact"],
  legal: ["privacy", "terms"],
};

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();

const { startNavigation } = usePageTransition(); // ← Global trigger
  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    startNavigation();
    router.push(path)
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">

      <div className="absolute -top-1.5 left-0 right-0 h-2 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(40)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div
                className="w-3 h-3 rotate-45"
                style={{
                  backgroundColor: i % 4 === 0 ? "#FF1D57" : i % 4 === 1 ? "#993EF9" : i % 4 === 2 ? "#41FF00" : "#fbbf24",
                  boxShadow: `0 0 12px ${i % 4 === 0 ? "#FF1D57" : i % 4 === 1 ? "#993EF9" : i % 4 === 2 ? "#41FF00" : "#fbbf24"}`,
                }}
              />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600" />
            </div>
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`dup-${i}`} className="flex items-center shrink-0">
              <div
                className="w-3 h-3 rotate-45"
                style={{
                  backgroundColor: i % 4 === 0 ? "#FF1D57" : i % 4 === 1 ? "#993EF9" : i % 4 === 2 ? "#41FF00" : "#fbbf24",
                  boxShadow: `0 0 12px ${i % 4 === 0 ? "#FF1D57" : i % 4 === 1 ? "#993EF9" : i % 4 === 2 ? "#41FF00" : "#fbbf24"}`,
                }}
              />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trophy + Stars, Floating Icons  */}
      <div className="flex absolute left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 -top-20 items-center justify-center gap-8 md:gap-12 lg:gap-16 py-8">
        {/* Your 5 stars + trophy  */}
        <div className="relative"><Star className="w-10 h-10 md:w-14 md:h-14 text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" /></div>
        <div className="relative"><Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-float" /></div>
        <div className="relative"><Trophy className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,1)] animate-float-delay" /></div>
        <div className="relative"><Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-float" /></div>
        <div className="relative"><Star className="w-10 h-10 md:w-14 md:h-14 text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" /></div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{ y: [-5, 30], rotate: [0, 360] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            style={{ left: `${8 + i * 13}%`, top: `${15 + (i % 4) * 20}%` }}
          >
            <item.Icon className="w-20 h-20" style={{ color: item.color }} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-5">
        <div className="text-center mb-5">
          <motion.div whileHover={{ scale: 1.08 }} className="inline-block mt-5">
            <Logo className="" />
          </motion.div>
          <p className="mt-3 lg:mt-0 text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-base">
            {t("description")}
          </p>
        </div>

        <div className="flex justify-center py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-5xl mx-auto mb-10 w-1/3 px-5 rounded-xl">
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} className="p-2 text-start transition-all">
                <h4 className="font-semibold text-lg mb-6 capitalize tracking-wide">{t(category)}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link}`}
                        onClick={(e) => handleInternalLink(e, `/${locale}/${link}`)}
                        className="text-gray-600 hover:text-rose-500 dark:text-gray-500 text-sm font-medium transition-colors block"
                      >
                        {t(`links.${link}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-10 w-1/2">
            <h3 className="text-xl mb-8 flex items-center justify-center gap-3">
              <Sparkles className="w-4 h-4 text-rose-500" />
              {t("trusted_partners")}
              <Sparkles className="w-4 h-4 text-rose-500" />
            </h3>
            <div className="flex flex-wrap justify-center py-0 items-center gap-3">
              {[
                "/images/integrations/walashi.png",
                "/images/integrations/connectPal.png",
                "/images/integrations/maalPay.png",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, y: -10 }}
                  className="bg-white dark:bg-gray-800/80 px-6 py-1 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
                >
                  <Image src={src} alt="Partner" width={50} height={50} className="" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-5 border-t border-gray-300 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("copyright")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("powered_by")}{" "}
            <a
              href="https://r-link.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:text-rose-400 inline-flex items-center gap-1"
            >
              {t("rlink")} <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white/30"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </footer>
  );
}