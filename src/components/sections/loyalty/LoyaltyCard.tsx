import DynamicIcon from "@/components/icons/DynamicIcon";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";


type Props = {
    title:string;
    description:string;
    icon: keyof typeof dynamicIconImports; 
}

const LoyaltyCard = (props: Props) => {
          const locale = useLocale();
          const isRtl = locale === "ar" ;
         const t = useTranslations("loyalty");
  return (
         <Card className="p-6 border-rose-500/30 hover:border-rose-500  dark:bg-slate-900 transition-all duration-300 group">
                    <div
                      className={cn(
                        "flex items-start gap-5",
                        isRtl && "flex-row gap-reverse"
                      )}
                    >
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <DynamicIcon name={props.icon} className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className={isRtl ? "text-right" : "text-left"}>
                        <h3 className="text-xl mb-2">{props.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {props.description}
                        </p>
                      </div>
                    </div>
                  </Card>
  )
}

export default LoyaltyCard