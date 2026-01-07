import ColoredTitle from "@/components/coloredTitle/ColoredTitle"
import {motion} from "framer-motion"
import { useTranslations } from "next-intl"
type Props = {}

const IntegrationsHeader = (props: Props) => {
    const t = useTranslations("integrations")
  return (
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-10"
        >
         <ColoredTitle json_key="integrations" className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl/20 my-5" />
          <p className="text-lg lg:text-xl/8 font-medium text-gray-600 dark:text-gray-500 max-w-3xl mt-5 mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
  )
}

export default IntegrationsHeader