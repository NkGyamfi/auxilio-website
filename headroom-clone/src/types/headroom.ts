export const HERO_CAROUSEL_WORDS = [
  "AI",
  "software",
  "systems",
  "workflows",
  "agents",
  "automations",
  "computers",
  "Headroom",
] as const;

export interface NavMenuLink {
  label: string;
  href: string;
}

export const NAV_MENU_LINKS: NavMenuLink[] = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Agencies", href: "/agencies" },
  { label: "Get access", href: "/get-access" },
  { label: "Login", href: "https://app.headroom.com/" },
];

export interface SocialLink {
  label: "LinkedIn" | "X" | "Instagram";
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/headroomai" },
  { label: "X", href: "https://twitter.com/headroomai" },
  { label: "Instagram", href: "https://instagram.com/headroomai" },
];

export const BUSINESS_TYPE_OPTIONS = [
  "Startup",
  "Agency",
  "Consulting",
  "E-commerce",
  "Retail",
  "Restaurant / Food Service",
  "Healthcare / Medical",
  "Education / Tutoring",
  "Real Estate",
  "Construction / Trades",
  "Finance / Accounting",
  "Legal Services",
  "Marketing / Advertising",
  "IT / Technology Services",
  "Manufacturing",
  "Nonprofit / Social Enterprise",
  "Transportation / Logistics",
  "Hospitality / Travel",
  "Personal Services",
  "Other",
] as const;

export const TEAM_SIZE_OPTIONS = [
  "1-5 employees",
  "6-10 employees",
  "11-25 employees",
  "26-50 employees",
  "51-100 employees",
  "100+ employees",
] as const;

export interface GetStartedFormValues {
  email: string;
  businessName: string;
  businessType: (typeof BUSINESS_TYPE_OPTIONS)[number] | "";
  teamSize: (typeof TEAM_SIZE_OPTIONS)[number] | "";
  description: string;
}
