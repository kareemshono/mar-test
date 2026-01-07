"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import HeroIframe from "./HeroIframe";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube.com/embed/BJEHnGYj_8E?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1",
}: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute -top-14 right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
          >
            <X className="h-8 w-8" strokeWidth={2.5} />
          </motion.button>

          {/* Animated Gradient Border */}
          <div className="pointer-events-none absolute -inset-1.5 rounded-3xl">
            <div
              className="max-w-2xl h-full mx-auto rounded-3xl opacity-70 blur-2xl"
              style={{
                background: "conic-gradient(from 90deg at 50% 50%, #FF1D57, #993EF9, #FF1D57)",
                animation: "spin 10s linear infinite",
              }}
            />
          </div>

          {/* Video Container */}
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-black shadow-2xl ring-8 ring-white/10">
            <div className="aspect-video">
             <HeroIframe />
            </div>

            {/* Corner Glow Lines */}
            {[
              { pos: "top-0 left-0", color: "#FF1D57", delay: 0 },
              { pos: "top-0 right-0", color: "#993EF9", delay: 0.4 },
              { pos: "bottom-0 left-0", color: "#993EF9", delay: 0.8 },
              { pos: "bottom-0 right-0", color: "#FF1D57", delay: 1.2 },
            ].map((c, i) => (
              <motion.div
                key={i}
                className={`absolute ${c.pos} w-32 h-32`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: c.delay }}
              >
                <div className={`absolute ${c.pos.includes("top") ? "bottom-0" : "top-0"} left-0 h-0.5 w-24 bg-gradient-to-r from-${c.color.slice(1)} to-transparent`} />
                <div className={`absolute ${c.pos.includes("left") ? "right-0" : "left-0"} top-0 w-0.5 h-24 bg-gradient-to-b from-${c.color.slice(1)} to-transparent`} />
              </motion.div>
            ))}

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#FF1D57" : "#993EF9",
                  boxShadow: `0 0 14px ${i % 2 === 0 ? "#FF1D57" : "#993EF9"}`,
                  left: `${5 + (i * 8)}%`,
                  top: i % 2 === 0 ? "-10%" : "110%",
                }}
                animate={{ y: [0, -50, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}