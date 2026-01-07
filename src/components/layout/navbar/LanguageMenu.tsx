import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LanguageMenu = ({}) => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const switchTo = (newLocale: "en" | "ar") => {
    if (locale === newLocale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <NavigationMenu >
      <NavigationMenuList >
        <NavigationMenuItem className="block ">
          <NavigationMenuTrigger className="cursor-item">
            <Globe className="w-7 h-7 text-gray-700 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-900 dark:text-white p-1" />
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className={cn(
              " origin-top-right  animate-in fade-in-0 ",
              "rounded-2xl !border-2 !border-purple-600/50 bg-white/95 dark:bg-gray-900/95 dark:backdrop-blur-xl",
              "p-4 w-48",
              ""
            )}>
            <ul className="grid w-50 p-2 gap-6 ">
              <li>
                <NavigationMenuLink asChild>
                  <Button
                    
                    onClick={() => switchTo("en")}
                    className="w-35 md:w-full text-white bg-gradient-to-r from-purple-500 to-rose-500 hover:text-white transition duration-300  hover:bg-gradient-to-l from-purple-500 to-rose-500 dark:bg-rose-500/10 mb-2 cursor-pointer"
                  >
                    {t("english")}
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Button
                    
                    onClick={() => switchTo("ar")}
                    className="w-35 md:w-full text-rose-500  bg-transparent border-1 border-rose-500 dark:bg-rose-500/20 hover:text-purple-500 hover:border-purple-500 cursor-pointer"
                  >
                    {t("arabic")}
                  </Button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LanguageMenu;
