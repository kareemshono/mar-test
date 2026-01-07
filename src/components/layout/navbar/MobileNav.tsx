"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { navigation } from "./navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageMenu from "./LanguageMenu";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: Props) {
  const t = useTranslations("navbar");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onClose(); 
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 pt-10 px-5">
        <SheetTitle>
          <Logo className="" />
        </SheetTitle>

        <nav className="flex flex-col gap-6 mt-8">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className="text-lg font-medium text-foreground/80 hover:text-foreground text-left"
            >
              {t(`${item.key}`)}
            </button>
          ))}
        </nav>

        <div className="mt-12 space-y-5 border-t pt-8">
          <ThemeSwitcher />
          <LanguageMenu />
          <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
            {t("get_demo")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}