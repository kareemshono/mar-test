"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
}

export default function LazyYouTube({ videoId, title = "Gamification Platform Demo" }: LazyYouTubeProps) {
  const [playing, setPlaying] = useState(false);

  // Use hqdefault (480x360) or sddefault (640x480) — much smaller than maxresdefault
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <iframe
        className="w-full h-full rounded-2xl"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className="relative w-full h-full cursor-pointer group rounded-2xl overflow-hidden"
      onClick={() => setPlaying(true)}
    >
      {/* Next.js Image — auto-optimized, responsive, lazy */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false} // Not LCP-critical → lazy is fine
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZKwAJgQEC5f9pDwAAAABJRU5ErkJggg=="
      />

      {/* Play button overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center group-hover:bg-black/40 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-20 h-20 bg-rose-500/90 rounded-full flex items-center justify-center shadow-2xl">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
      </motion.div>

      {/* Hover text */}
      <div className="absolute bottom-4 left-4 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        Watch Demo
      </div>
    </div>
  );
}