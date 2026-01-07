import { Card } from "@/components/ui/card";
import {motion} from "framer-motion"
import Image from "next/image";
type Props = {
    tag:string;
    description:string;
    title:string;
    status:string;
    color:string;
    logo:string;
    i:any
}

const FeaturedPartnerCard = (props: Props) => {
  return (
                    <motion.div
                      key={props.i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: props.i * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="h-full"
                    >
                      <Card className="gap-0 p-6 sm:p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-transparent transition-all group relative overflow-hidden h-full">
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                          animate={{
                            boxShadow: [
                              `0 0 0px ${props.color}00`,
                              `0 0 30px ${props.color}60`,
                              `0 0 0px ${props.color}00`,
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at top left, ${props.color}, transparent 70%)`,
                          }}
                        />
    
                        <div className="relative z-10">
                          <div className="w-8 h-8 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 md:p-4 overflow-hidden shadow-md">
                            <Image
                              src={props.logo}
                              alt={props.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          </div>
    
                          <span
                            className="inline-block px-2 py-2 sm:px-4 sm:py-1 rounded-full  sm:text-sm  text-white mb-4"
                            style={{ backgroundColor: props.color }}
                          >
                            {props.tag}
                          </span>
    
                          <h4 className="text-xl sm:text-2xl  mb-3">
                            {props.title}
                          </h4>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            {props.description}
                          </p>
                          <div className="flex items-center gap-2 mt-6">
                            <motion.div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: props.color }}
                              animate={{ scale: [1, 1.4, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-sm text-gray-500">
                              {props.status}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
  )
}

export default FeaturedPartnerCard