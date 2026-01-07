"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by not rendering logo src until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback to light logo on server/first render
  const logoSrc = mounted && resolvedTheme === "dark"
    ? "/images/logoDark.png"
    : "/images/navLogoLight.png";

  return (
    <Link href="/" className={cn("md:mr-10 lg:mr-20 rtl:mr-0 rtl:lg:ml-10", className)}>
      <Image
        src={logoSrc}
        priority
        width={150}
        height={100}
        alt="Mario Logo"
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;