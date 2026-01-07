"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState("#FF1D57");

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      document.body.style.cursor = "auto";
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor-color], .cursor-pointer"
      );

      if (interactive) {
        setIsHovering(true);
        const customColor = interactive.getAttribute("data-cursor-color") || "#FF1D57";
        setCursorColor(customColor);
      } else {
        setIsHovering(false);
        setCursorColor("#FF1D57");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  

  return (
    <>
      {/* Main glowing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 40, stiffness: 500, mass: 0.5 }}
        style={{
          width: 16,
          height: 16,
          background: cursorColor,
          borderRadius: "50%",
          boxShadow: `0 0 20px ${cursorColor}, 0 0 40px ${cursorColor}80`,
          scale: isHovering ? 0.6 : 1,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border-2"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 16),
          y: mousePos.y - (isHovering ? 20 : 16),
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        style={{
          borderColor: cursorColor,
          boxShadow: `0 0 30px ${cursorColor}60`,
        }}
      />

      {/* Soft glow background */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full blur-3xl"
        animate={{
          x: mousePos.x - 40,
          y: mousePos.y - 40,
          opacity: isHovering ? 0.4 : 0.25,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 300 }}
        style={{
          width: 80,
          height: 80,
          background: `radial-gradient(circle, ${cursorColor}40 0%, transparent 70%)`,
        }}
      />
    </>
  );
}