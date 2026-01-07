import ColoredTitle from "@/components/coloredTitle/ColoredTitle"
import { useTranslations } from "next-intl"

type Props = {}

const GamesHeader = (props: Props) => {
    const t = useTranslations("games")
  return (
         <header className="flex flex-col justify-center items-center text-center">
     <ColoredTitle json_key="games" className="text-3xl sm:text-3xl md:text-5xl lg:text-5xl/20 lg:p-0" />
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-lg lg:text-xl/8 font-medium text-gray-600">
            {t("subtitle")}
          </p>
        </div>
      </header>

  )
}

export default GamesHeader