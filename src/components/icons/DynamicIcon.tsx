"use client"; 

import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type DynamicIconProps = LucideProps & {
  name: keyof typeof dynamicIconImports; 
};

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    ssr: false, // Icons are client-only
    loading: () => (
      <div
        className={`h-6 w-6 animate-pulse rounded bg-gray-300 dark:bg-gray-600 ${props.className || ""}`}
      />
    ),
  });

  return <LucideIcon {...props} />;
};

export default DynamicIcon;