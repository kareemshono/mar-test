import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl";
import ColoredTitle from "@/components/coloredTitle/ColoredTitle";


const LoyaltyHeader = () => {
      const locale = useLocale();
  const isRtl = locale === "ar" ;
  const t = useTranslations("loyalty");
  return (
    <header>
          <ColoredTitle json_key="loyalty" className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-5xl/20  mb-6 text-slate-900 dark:text-white",
              "text-center lg:text-left",
              isRtl && "text-right lg:text-right"
            )} />

          <p
            className={cn(
              "text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium mb-10",
              "text-center lg:text-left",
              isRtl && "text-right lg:text-right"
            )}
          >
            {t("subtitle")}
          </p>
    </header>
  )
}

export default LoyaltyHeader