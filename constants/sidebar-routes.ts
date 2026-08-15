import {
  BriefcaseBusiness,
  DollarSign,
  HelpCircle,
  Home,
  LucideIcon,
  Mail,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

export interface SidebarRoute {
  labelKey:
    | "nav.dashboard"
    | "nav.products"
    | "nav.users"
    | "nav.recipes"
    | "nav.sales"
    | "nav.messages"
    | "nav.help"
    | "nav.settings";
  path: string;
  icon: LucideIcon;
}

export const sidebarRoutes: SidebarRoute[] = [
  { labelKey: "nav.dashboard", path: "/", icon: Home },
  { labelKey: "nav.products", path: "/products", icon: BriefcaseBusiness },
  { labelKey: "nav.users", path: "/users", icon: User },
  { labelKey: "nav.recipes", path: "/recipes", icon: ShoppingCart },
  { labelKey: "nav.sales", path: "/sales", icon: DollarSign },
  { labelKey: "nav.messages", path: "/messages", icon: Mail },
  { labelKey: "nav.help", path: "/help", icon: HelpCircle },
  { labelKey: "nav.settings", path: "/settings", icon: Settings },
];
