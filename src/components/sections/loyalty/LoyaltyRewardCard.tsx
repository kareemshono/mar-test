import DynamicIcon from "@/components/icons/DynamicIcon";
import { cn } from "@/lib/utils";
import {motion} from "framer-motion";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useLocale, useTranslations } from "use-intl";


type Props = {

    name:string;
    color:string;
    points:number;
    icon:keyof typeof dynamicIconImports;
    i: any;
}

const LoyaltyRewardCard = (props: Props) => {
              const locale = useLocale();
              const isRtl = locale === "ar" ;
             const t = useTranslations("loyalty");
  return (
      <motion.div
                            key={props.i}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: props.i * 0.05 }}
                            className="flex justify-between items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-50050 transition-all group"
                          >
                            <div
                              className={cn(
                                "flex items-center gap-4",
                                isRtl && "flex-row"
                              )}
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: props.color }}
                              >
                                <DynamicIcon name={props.icon} className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-sm">{props.name}</span>
                            </div>
                            <span
                              className="text-sm font-bold px-3 py-1 rounded"
                              style={{
                                backgroundColor: props.color + "20",
                                color: props.color,
                              }}
                            >
                              {props.points}
                              {t("pts")}
                            </span>
                          </motion.div>
  )
}

export default LoyaltyRewardCard