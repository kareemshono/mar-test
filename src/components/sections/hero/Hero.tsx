"use client";
import { Sparkles, Zap, Maximize2, Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import HeroButton from "./HeroButton";
import HeroIframe from "./HeroIframe";
import VideoAnimatedCorners from "./VideoAnimatedCorners";
import VideoFloatingIcons from "./VideoFloatingIcons";
import VideoStatsCard from "./VideoStatsCard";
import VideoModal from "./VideoModal";
import ColoredTitle from "@/components/coloredTitle/ColoredTitle";

const Hero = () => {
  const t = useTranslations("hero");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const statsArray = [
        { label: "users", value: "50K+", icon:"trophy" as const , color: "#FF1D57" },
        {
          label: "engagement",
          value: "+85%",
          icon: "sparkles" as const,
          color: "#993EF9",
        },
        { label: "rewards", value: "1M+", icon: "gift" as const , color: "#FF1D57" },
            ]
            

const videoRef = useRef<HTMLDivElement>(null);

const handleScrollClick = () => {
  videoRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",        
    inline: "nearest"
  });
};
  
  return (
    <Container >
        <section
      id="hero"
      className="w-full flex flex-col justify-center  items-center relative overflow-x-hidden"
    >
      {/* Video Modal for full screen*/}
     <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      {/* glowing circles - background*/}
      <div className="w-64 h-64 rounded-full  bg-fuchsia-400/20 dark:bg-rose-900/10 dark:drop-shadow-2xl dark:drop-shadow-rose-500/70 blur-lg absolute top-0 left-25 z-[-1]"></div>
      <div className="w-64 h-64 rounded-full  bg-fuchsia-400/20 dark:bg-rose-900/10 dark:drop-shadow-2xl dark:drop-shadow-rose-500/70 blur-lg absolute top-50 right-15 z-[-1]"></div>
      {/* colored - title - badge  */}
      <div className="border-1 border-rose-500/60  mt-10 lg:mt-10 bg-rose-500/20 py-1 px-5 rounded-xl flex gap-2 duration-1000 hover:scale-[1.1]">
        <Sparkles className="text-rose-500 p-1" />
        <h3 className="text-rose-500">{t("badge")}</h3>
        <Dot  strokeWidth="5px" className=" animate-pulse text-rose-500" />
      </div>
      
      {/* title */}
      <div className="max-w-4xl  text-center">
       <ColoredTitle json_key="hero" className="text-4xl sm:text-5xl space-y-6 md:text-6xl lg:text-7xl" />
      </div>
      {/* subtitle */}
      
      <div className="max-w-xl  lg:max-w-3xl mt-10">
        <p className="text-lg lg:text-xl/8 text-center text-gray-600 dark:text-gray-400">
          {t("subtitle")}
        </p>
      </div>

      {/* cta buttons */}
      <div className="flex gap-3 mt-10"> 
        <HeroButton className="py-6 px-10 bg-purple-500 text-white shadow-2xl shadow-purple-500/30 hover:bg-purple-500 hover:shadow-purple-500/70 hover:scale-[1.05]" 
        text={t("btn_get_demo")}  
        color="white" 
        onClick={handleScrollClick} 
        href="https://calendly.com/quantumgatehero/30min"
        icon={<Zap />} />
        {/* Watch video btn  */}
        <HeroButton
          onClick={handleScrollClick}
          className="bg-transparent py-6 px-8 border-1 border-gray-800/50 text-whtie hover:text-rose-500 hover:bg-transparent hover:shadow-lg hover:shadow-rose-500/50 hover:border-rose-500 hover:scale-[1.05]"
          text={t("btn_watch_video")}
          color="text-rose-500"
          icon={<Dot  strokeWidth="10px" className=" animate-pulse text-rose-500" />}    
       />
      </div>

          {/*/////////////////////// VIDEO - IFRAME SECTION  ///////////////////// */}
      <div className="w-full max-w-6xl  box-border relative mt-15 pb-10">
        <motion.div
          id="demo-video"
          ref={videoRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl p-5 mx-auto
            "
          >
          {/* Animated border glow */}
          <div
            className="relative rounded-2xl max-w-5xl mx-auto  border-4 border-white dark:border-gray-800 shadow-2xl shadow-purple-600 bg-gray-900 group"
            style={{
              cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z' fill='%23FF1D57' stroke='%23993EF9' stroke-width='1'/%3E%3Ccircle cx='12' cy='12' r='2' fill='white'/%3E%3C/svg%3E") 12 12, auto`,
            }}
          >
            {/* Video Container */}
            <div className="aspect-video rounded-2xl  relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {/* main iframe component  */}
               <HeroIframe />

              {/* Animated corner top - left - right - bottom */}
              <VideoAnimatedCorners />
            </div>

            {/* Floating particles around video */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#FF1D57" : "#993EF9",
                    boxShadow: `0 0 10px ${
                      i % 2 === 0 ? "#FF1D57" : "#993EF9"
                    }`,
                    top: `${1.2 * 100}%`,
                    left: `${1.2 * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 1.2 * 20 - 10, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + 1.2 * 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
            {/* Video Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute rounded-2xl bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent p-4 md:p-6 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-3 pointer-events-none">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#FF1D57] flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    style={{ boxShadow: "0 0 20px rgba(255, 29, 87, 0.5)" }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-white text-sm md:text-base">
                      Platform Demo Video
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      See gamification in action
                    </p>
                  </div>
                </div>

                {/* Fullscreen Button - Card Style */}
                <motion.button
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Fullscreen"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2 pointer-events-auto relative group/icon"
                  style={{
                    borderColor: "#FF1D57",
                    boxShadow: "0 0 20px rgba(255, 29, 87, 0.4)",
                  }}
                  data-cursor-color="#FF1D57"
                >
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/icon:opacity-100"
                    style={{ backgroundColor: "#FF1D57" }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <Maximize2
                    className="w-6 h-6 relative z-10"
                    style={{ color: "#FF1D57" }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
          {/* Floating Feature Icons */}
          <VideoFloatingIcons />
          {/* Stats overlay below video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 grid grid-cols-3 gap-4 md:gap-5"
          >
            {statsArray.map((stat, idx) => (
              <VideoStatsCard
                key={idx}
                index={idx}
                value={stat.value}
                label={t(stat.label)}
                icon={stat.icon} 
                color={stat.color}
                
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
    </Container>
  
  );
};

export default Hero;
