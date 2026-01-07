import { Card } from "@/components/ui/card";
import {motion} from "framer-motion"

type Props = {
    value:string;
    label:string;
    i:number
}

const GamesStatCard = (props: Props) => {
  return (
           <motion.div
              key={props.i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: props.i * 0.1 }}
              whileHover={{ y: -6, scale: 1.04 }}
            >
              <Card className="gap-0 p-6 text-center bg-white dark:bg-transparent dark:backdrop-blur dark:bg-gradient-to-t from-indigo-950  to-slate-950 border border-gray-200 dark:border-gray-800 hover:border-rose-500 transition-all group">
                <div className="text-3xl sm:text-2xl  text-rose-500 group-hover:scale-110 transition-transform">
                  {props.value}
                </div>
                <div className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {props.label}
                </div>
              </Card>
            </motion.div>
  )
}

export default GamesStatCard