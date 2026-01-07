import {motion} from "framer-motion"
import { useTranslations } from "next-intl";

type Props = {
    name:string;
    users:number;
    change:number;
    i:number;
}

const TopPerformersCard = (props: Props) => {
    const t = useTranslations("dashboard")
  return (
       <motion.div
                    key={props.i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: props.i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                      style={{
                        backgroundColor:
                          props.i === 0 ? "#FF1D57" : props.i === 1 ? "#993EF9" : "#41FF00",
                      }}
                    >
                      #{props.i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {props.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {props.users.toLocaleString()} {t("participants")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-400 bg-green-200/10 rounded-lg p-1">
                        +{props.change}%
                      </div>
                      <div className="flex gap-1 justify-end mt-2">
                        {[60, 75, 70, 90, 85, 95].map((h, j) => (
                          <div
                            key={j}
                            className="w-2 rounded-t"
                            style={{
                              height: `${h}%`,
                              backgroundColor:
                                props.i === 0
                                  ? "#FF1D57"
                                  : props.i === 1
                                  ? "#993EF9"
                                  : "#41FF00",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
  )
}

export default TopPerformersCard