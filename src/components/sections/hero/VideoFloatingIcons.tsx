import { Gift, Sparkles, Trophy, Zap } from "lucide-react"
import {motion} from "framer-motion"

const VideoFloatingIcons = () => {
  return (
    <>
    {[
            {
              icon: Trophy,
              top: "10%",
              left: "0%",
              delay: 0,
              color: "#FF1D57",
            },
            {
              icon: Gift,
              top: "60%",
              left: "0%",
              delay: 0.2,
              color: "#993EF9",
            },
            {
              icon: Sparkles,
              top: "20%",
              right: "5%",
              delay: 0.4,
              color: "#FF1D57",
            },
            {
              icon: Zap,
              top: "70%",
              right: "10%",
              delay: 0.6,
              color: "#993EF9",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + item.delay, duration: 0.5 }}
              className="absolute hidden lg:block"
              style={{ top: item.top, left: item.left, right: item.right }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: item.delay,
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2  relative group/icon"
                style={{
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
              >
                {/* Icon glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/icon:opacity-100"
                  style={{ backgroundColor: item.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <item.icon
                  className="w-8 h-8 relative z-10"
                  style={{ color: item.color }}
                />
              </motion.div>
            </motion.div>
          ))}
    </>
  )
}

export default VideoFloatingIcons