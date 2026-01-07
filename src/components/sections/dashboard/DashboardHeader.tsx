import ColoredTitle from "@/components/coloredTitle/ColoredTitle"
import {motion} from "framer-motion"
import { TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"


const DashboardHeader = () => {
    const t = useTranslations("dashboard")
  return (
     <header className="w-full flex flex-col items-center text-center">
        <div className="border-4 border-violet-500 rounded-full p-4 ">
          <motion.div
                    animate={{
              y: [-5, 10, -5], 
            }}
            transition={{
              duration: 4,        
              ease: "easeInOut",  
              repeat: Infinity,   
              repeatType: "loop", 
  }}
          >
            <TrendingUp className="w-10 h-10 text-rose-500 " />
          </motion.div>
        </div>
      <ColoredTitle json_key="dashboard" className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl/20 my-5"/>
        <div className="max-w-3xl">
          <p className="text-lg lg:text-xl/8 font-medium text-gray-600 dark:text-gray-500">
            {t("subtitle")}
          </p>
        </div>
      </header>
  )
}

export default DashboardHeader