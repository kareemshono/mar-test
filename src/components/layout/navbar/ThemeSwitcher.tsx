"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-xl bg-gray-200  animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-700 
                 flex items-center justify-center mr-3 lg:mr-0
                 transition-all duration-300 hover:scale-110 hover:shadow-xl
                 group"
      aria-label="Toggle theme"
    >
      {/* Moon → shown in Light mode (invite to go dark) */}
      <Moon
        className={`absolute w-5 h-5 text-slate-600 transition-all duration-500
          ${
            !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
      />

      {/* Sun → shown in Dark mode (invite to go light) */}
      <Sun
        className={`absolute w-5 h-5 text-yellow-600 transition-all duration-500
          ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
      />

      {/* Hover glow */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500/20 to-purple-600/20 blur-xl" />
      </span>
    </button>
  );
}
