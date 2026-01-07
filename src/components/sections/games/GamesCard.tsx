import DynamicIcon from "@/components/icons/DynamicIcon";
import { Card } from "@/components/ui/card";
import {motion} from "framer-motion"
import dynamicIconImports from "lucide-react/dynamicIconImports";

type Props = {
    title:string;
    description:string;
    color:string;
    icon: keyof typeof dynamicIconImports;
    idx:number;
}

const GamesCard = (props: Props) => {
  return (
        <motion.div
                    key={props.idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: props.idx * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="p-5  sm:p-6 h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-rose-500 transition-all duration-300 group relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at top left, ${props.color}20 0%, transparent 70%)`,
                        }}
                      />
                      <div className="relative z-10">
                        <motion.div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-lg transition-shadow"
                          style={{ backgroundColor: props.color }}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          <DynamicIcon name={props.icon} className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">
                          {props.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          {props.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
  )
}

export default GamesCard