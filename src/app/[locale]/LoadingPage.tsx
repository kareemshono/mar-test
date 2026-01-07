"use client";

import Loader from "@/components/loader-ui/loader";
import { usePageTransition } from "@/components/transitionProvider/TransitionProvider";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function LoadingPage() {
  const t = useTranslations("loader");
  const { isPending } = usePageTransition(); // ← Global 
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const shouldShow = initialLoad || isPending;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-slate-950 flex justify-center items-center">
      <Loader title={t("loading")} subtitle={t("wait")} />
    </div>
  );
}