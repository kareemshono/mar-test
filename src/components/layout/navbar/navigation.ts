export interface NavItem {
  key: string;
  href: string; 
}

export const navigation: NavItem[] = [
  { key: "features", href: "features" },
  { key: "dashboard", href: "dashboard" },
  { key: "integrations", href: "integrations" },
  { key: "pricing", href: "pricing" },
  { key: "faq", href: "faq" },
] as const;