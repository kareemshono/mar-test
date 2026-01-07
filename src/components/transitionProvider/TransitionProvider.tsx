"use client";

import { createContext, useContext, useTransition, ReactNode } from "react";

type TransitionContextType = {
  isPending: boolean;
  startNavigation: () => void; 
};
const TransitionContext = createContext<TransitionContextType>({
  isPending: false,
  startNavigation: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();


  (TransitionProvider as any).startTransition = startTransition;
const startNavigation = () => {
    startTransition(() => {});
  };
  return (
    <TransitionContext.Provider value={{ isPending, startNavigation }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}