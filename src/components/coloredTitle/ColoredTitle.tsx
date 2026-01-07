import { cn } from "@/lib/utils";
import {motion} from "framer-motion"
import { useTranslations } from "next-intl";
type Props = {
    json_key:string;
    className:string;
}

const ColoredTitle = (props: Props) => {
    const t = useTranslations(`${props.json_key}`)
  return (
     <h1 className={cn(" mt-10 text-slate-900 dark:text-white mb-6  ", props.className)}>
          {t.rich("title",{
            colored:(chunks) => {
               return<span className="text-rose-500 font-semibold relative">
                {chunks}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF1D57]"
              style={{ boxShadow: "0 0 20px rgba(255, 29, 87, 0.6)" }}
              animate={{
                scaleX: [0.7, 1, 0.7],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
               </span>
            }
          })}{" "}
        </h1>
  )
}

export default ColoredTitle