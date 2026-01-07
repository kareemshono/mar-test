import DynamicIcon from "@/components/icons/DynamicIcon";
import { Card } from "@/components/ui/card"
import {easeInOut,motion} from "framer-motion"
import { MoveUp } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type Props = {
    label:string;
    value:string;
    change:string;
    color:string;
    icon: keyof typeof dynamicIconImports;
    i:any
}

const DashboardMetricsCard = (props: Props) => {
  return (
   <>
     <motion.div
                key={props.i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: props.i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="h-full"
              >
                <Card className="p-6  bg-white dark:bg-gray-900 border border border-gray-200 dark:border-gray-800 hover:border-transparent transition-all group relative overflow-hidden h-full">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${props.color}60, transparent)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${props.color}15` }}
                      >
                        <DynamicIcon name={props.icon} className="w-7 h-7" style={{ color: props.color }} />
                      </div>
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
                        style={{
                          backgroundColor: `${props.color}20`,
                          color: props.color,
                        }}
                      >
                        <MoveUp className="w-3.5 h-3.5" /> {props.change}
                      </span>
                    </div>

                    <div
                      className="text-3xl sm:text-4xl   mb-2"
                      style={{ color: props.color }}
                    >
                      {props.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {props.label}
                    </div>

                    <div className="flex items-end gap-1 h-10 mt-6">
                      {[65, 78, 70, 88, 82, 95, 90].map((h, j) => (
                        <motion.div
                          key={j}
                          className="flex-1 rounded-t"
                          style={{ backgroundColor: `${props.color}40` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + j * 0.06 }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
   </motion.div>
   </>
  )
}

export default DashboardMetricsCard