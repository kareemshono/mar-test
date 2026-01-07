import ColoredTitle from "@/components/coloredTitle/ColoredTitle"
import {motion} from "framer-motion"
import { useTranslations } from "next-intl"

const FaqHeader = () => {
    const t = useTranslations("faq")
  return (
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
      <ColoredTitle json_key="faq" className="text-3xl/10 sm:text-3xl md:text-5xl lg:text-5xl/20"/>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ">
            {t("subtitle")}
          </p>
        </motion.div>
  )
}

export default FaqHeader