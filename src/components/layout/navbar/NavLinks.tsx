"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { navigation } from "./navigation";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation"; 
import { useTransition } from "react";

interface Props {
  className?: string;
}

export default function NavLinks({ className }: Props) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Check if current page is the root/home (after locale)
  const isHomePage = pathname.match(/^\/(en|ar)(\/)?$/) !== null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) {
      // Already on home → smooth scroll only (no navigation)
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other page → navigate to home#section with transition loader
      e.preventDefault();
      startTransition(() => {
        router.push(`/#${sectionId}`);
      });
    }
  };

  return (
    <ul className={cn("hidden md:flex md:mr-5 lg:mr-0 items-center gap-8", className)}>
      {navigation.map((item) => (
        <li key={item.key}>
          <Link
            href={`/#${item.href}`}
            onClick={(e) => handleClick(e, item.href)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            {t(`${item.key}`)}
          </Link>
        </li>
      ))}
    </ul>
  );
}