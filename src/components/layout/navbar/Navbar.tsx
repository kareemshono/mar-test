"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNavButton from "./MobileNavButton";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageMenu from "./LanguageMenu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navbar");

  return (
    <>
      <header className=" inset-x-0 top-0 z-50 border-b border-border/40 ">
        <nav className="container mx-auto flex h-16 items-center justify-between py-5 px-4 md:px-6">
          <Logo className="" />
          <NavLinks />

          {/* Desktop right side */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-4">
            <ThemeSwitcher />
            <LanguageMenu />
             <Link target="_target" href="https://calendly.com/quantumgatehero/30min">
            <Button aria-label="language" className="bg-rose-500  hover:bg-rose-600 text-white">
              {t("get_demo")}
            </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <MobileNavButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </nav>
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
