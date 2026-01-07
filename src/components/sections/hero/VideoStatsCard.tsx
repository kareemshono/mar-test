import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; 
import DynamicIcon from "@/components/icons/DynamicIcon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type Props = {
  value: string;
  label: string;
  icon: keyof typeof dynamicIconImports; 
 color:string;
  index: number;    
};

const VideoStatsCard = ({ value, label, icon, color, index }: Props) => {
  return (
    <motion.div
      style={{ boxShadow: "0px 0px 30px #dd2a56ff" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 + index * 0.1 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 md:p-6 text-center",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        "group/stat"
      )}
    >
      {/* Hover glow background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon circle */}
        <motion.div
          className="mx-auto mb-2 md:mb-3 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}40`,
          }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <DynamicIcon name={icon} className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </motion.div>

        {/* Value */}
        <p className="mb-1 text-2xl md:text-3xl" style={{ color }}>
          {value}
        </p>

        {/* Label */}
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default VideoStatsCard;