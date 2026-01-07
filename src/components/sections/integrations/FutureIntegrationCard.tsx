import dynamicIconImports from "lucide-react/dynamicIconImports";
import {motion} from "framer-motion"
import { Card } from "@/components/ui/card";
import DynamicIcon from "@/components/icons/DynamicIcon";
type Props = {
    name:string;
    description:string;
    icon:keyof typeof dynamicIconImports;
    color:string;
    i: any;
}

const FutureIntegrationCard = (props: Props) => {
  return (
    <motion.div
                  
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: props.i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <Card className="gap-1 p-4 sm:p-6 lg:p-5  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-rose-500 transition-all group h-full ">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center  mb-4 shadow-lg"
                      style={{
                        backgroundColor: props.color,
                        boxShadow: `0 8px 25px ${props.color}40`,
                      }}
                    >
                      <DynamicIcon name={props.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">
                      {props.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight">
                      {props.description}
                    </p>
                  </Card>
                </motion.div>
  )
}

export default FutureIntegrationCard