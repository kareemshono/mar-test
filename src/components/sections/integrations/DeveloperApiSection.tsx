import { Card } from "@/components/ui/card"
import {motion} from "framer-motion"
import { Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
type Props = {}

const DeveloperApiSection = (props: Props) => {
    const t = useTranslations("integrations");
      const api = t.raw("api");

      return (
      <motion.div
          className="px-0 sm:px-6 lg:px-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl">
            <div className="absolute right-10 top-30 w-50 h-50 bg-gradient-to-r from-rose-800/10 via-rose-800/20 to-rose-800/10 animate-pulse blur-xl rounded-full"></div>
            <div className="absolute left-10 top-40 w-50 h-50 bg-gradient-to-r from-indigo-800/10 via-indigo-800/20 to-indigo-800/10 animate-pulse blur-xl rounded-full"></div>
            <div className="relative z-10 p-8 sm:p-10 lg:p-12">
              {" "}
              {/* responsive padding */}
              <div className="max-w-7xl mx-auto w-full px-0 sm:px-4 lg:px-8">
                {" "}
                {/* Header + Status */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10 text-center lg:text-left">
                  <div className="flex-1">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mx-auto lg:mx-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Zap className="w-5 h-5 text-[#41FF00]" />
                      </motion.div>
                      <span className="text-xs uppercase tracking-wider text-white/90">
                        {api.badge}
                      </span>
                    </motion.div>

                    <h3 className="text-2xl md:text-4xl rtl:text-right text-white mb-4">
                      {api.title.split("Custom")[0]}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1D57] to-[#993EF9]">
                       {" "} Custom  {api.title.split("Custom")[1]}
                      </span>
                    </h3>
                    <p className="text-md text-white/80 max-w-2xl mx-auto lg:mx-0 rtl:text-right">
                      {api.description}
                    </p>
                  </div>
                  {/* Status Box */}
                  <motion.div
                    className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-sm mx-auto lg:mx-0 lg:w-auto rtl:text-right"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div>
                      <div className="text-xs text-gray-400 mb-1 ">
                        {api.status_label}
                      </div>
                      <div className="flex  items-center gap-3 rtl:flex-row-reverse">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-[#41FF00]"
                          animate={{
                            boxShadow: [
                              "0 0 0px #41FF00",
                              "0 0 16px #41FF00",
                              "0 0 0px #41FF00",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-white font-medium">
                          {api.status_value}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* Stats Grid */}
          
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  {api.stats.map((stat: any, i: number) => (
                    <motion.div
                      key={i}
                      className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group  overflow-hidden text-center sm:text-left rtl:text-right"
                      whileHover={{ scale: 1.05, borderColor: stat.color }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `radial-gradient(circle at center, ${stat.color}15, transparent)`,
                        }}
                      />
                      <div className="relative z-10">
                        <div className="text-xs text-gray-400 mb-2">
                          {stat.label}
                        </div>
                        <div
                          className=" text-xl lg:text-3xl font-bold text-white mb-1"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stat.subtitle}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Buttons */}

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <motion.button
                    onClick={() =>
        toast(t("docToast"), {
          description: t("docToastTuned"),
          action: {
            label: t("docToastOk"),
            onClick: () => console.log("ok"),
          },
        })
      }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-5 rounded-xl overflow-hidden font-semibold w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF1D57] to-[#993EF9]" />
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#993EF9] to-[#FF1D57] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-3 text-white">
                      {api.btn_docs}
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.button>

                  {/* <motion.button
                    whileHover={{ scale: 1.02, borderColor: "#41FF00" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 rounded-xl border-2 border-white/20 text-white backdrop-blur-sm font-semibold flex items-center justify-center gap-3 hover:bg-white/5 transition-all w-full sm:w-auto"
                  >
                    <Zap className="w-5 h-5 text-[#41FF00]" />
                    {api.btn_key}
                  </motion.button> */}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
  )
}

export default DeveloperApiSection