"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const SEGMENTS = [
  { key: "cashback", color: "#FF1D57", type: "reward" },
  { key: "points", color: "#E01A4F", type: "points" },
  { key: "voucher", color: "#FF6B96", type: "reward" },
  { key: "more_spin_try", color: "#C21747", type: "tryagain" },
  { key: "scratch_and_win", color: "#FFB7CC", type: "reward" },
  { key: "discount", color: "#A3143F", type: "reward" },
  { key: "esim", color: "#FF4D7F", type: "reward" },
  { key: "gift_card", color: "#E01A4F", type: "reward" },
] as const;

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export default function SpinWheel() {
  const t = useTranslations("games.wheel");
  const tSegments = useTranslations("games.wheel.segments");

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [wonPoints, setWonPoints] = useState<number | null>(null);

  useEffect(() => {
    if (!result || isSpinning) return;
    const timer = setTimeout(() => {
      setResult(null);
      setWonPoints(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [result, isSpinning]);

  const spin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setWonPoints(null);

    const winIndex = Math.floor(Math.random() * SEGMENTS.length);
    const midAngle = winIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const pointerAngle = 270;
    const current = ((rotation % 360) + 360) % 360;
    let delta = pointerAngle - midAngle - current;
    if (delta < 0) delta += 360;

    const total = rotation + 5 * 360 + delta;
    setRotation(total);

    setTimeout(() => {
      setIsSpinning(false);
      const segment = SEGMENTS[winIndex];
      setResult(tSegments(segment.key));
      if (segment.type === "points") {
        const points = [50, 100, 150, 200, 250, 300, 500, 1000];
        setWonPoints(points[Math.floor(Math.random() * points.length)]);
      }
    }, 4000);
  }, [isSpinning, rotation, tSegments]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mb-7 lg:mb-0 lg:max-w-lg mx-auto select-none">
      <div className="relative aspect-square">
        <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 opacity-0 group-hover/wheel:opacity-60 blur-2xl transition-opacity pointer-events-none" />

        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden  shadow-2xl shadow-rose-500 hover:shadow-3xl hover:shadow-purple-500  select-none group/wheel"
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 4 : 1,
            ease: isSpinning ? [0.22, 0.1, 0.28, 1] : "easeOut",
          }}
          whileHover={{ scale: isSpinning ? 1 : 1.03 }}
          whileTap={{ scale: isSpinning ? 1 : 0.96 }}
          onClick={spin}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {SEGMENTS.map((seg, i) => {
              const start = i * SEGMENT_ANGLE;
              const end = (i + 1) * SEGMENT_ANGLE;
              const mid = (start + end) / 2;

              const x1 = 100 + 98 * Math.cos((start * Math.PI) / 180);
              const y1 = 100 + 98 * Math.sin((start * Math.PI) / 180);
              const x2 = 100 + 98 * Math.cos((end * Math.PI) / 180);
              const y2 = 100 + 98 * Math.sin((end * Math.PI) / 180);

              const tx = 100 + 68 * Math.cos((mid * Math.PI) / 180);
              const ty = 100 + 68 * Math.sin((mid * Math.PI) / 180);

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A98,98 0 0,1 ${x2},${y2} Z`}
                    fill={seg.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={tx}
                    y={ty}
                    fill="#fff"
                    fontSize={tSegments(seg.key).length > 10 ? "5.5" : "7"}
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${mid + 90} ${tx} ${ty})`}
                    className="pointer-events-none"
                  >
                    {tSegments(seg.key)}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-900 border-4 border-rose-500 shadow-2xl flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 z-20 animate-bounce">
          <div className="w-6 h-6 border-xl-8 sm:border-12 border-l-transparent border-b-transparent border-r-transparent border-t-16 sm:border-t-20 border-t-rose-500" />
        </div>
      </div>

      {/* Translated Button */}
      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 px-8 sm:px-10 py-4 sm:py-3 bg-gradient-to-r from-purple-600 to-rose-500 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl disabled:opacity-60 z-30 flex items-center gap-3 whitespace-nowrap"
        whileHover={{ scale: isSpinning ? 1 : 1.08 }}
        whileTap={{ scale: isSpinning ? 1 : 0.95 }}
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        {isSpinning ? t("spinning") : t("spin_button")}
      </motion.button>

      {/* Translated Result */}
      <AnimatePresence>
        {result && !isSpinning && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <motion.div
              className="bg-slate-800/70 dark:bg-slate-800 backdrop-blur rounded-3xl p-8 sm:p-10 shadow-2xl border-3 border-purple-500 text-center max-w-xs sm:max-w-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl sm:text-3xl font-bold text-rose-500 mb-2">
                {t("you_won")}
              </h3>
              <p className="text-2xl sm:text-3xl text-white ">{result}</p>
              {wonPoints && (
                <p className="text-xl sm:text-2xl mt-3 text-purple-600">
                  +{wonPoints} {tSegments("points")}
                </p>
              )}
              <p className="text-base sm:text-lg mt-4 text-gray-200">
                {t("congratulations")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
