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
  label: string;
  path: string;
  icon: LucideIcon;
}

export const sidebarRoutes = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Products", path: "/products", icon: BriefcaseBusiness },
  { label: "Users", path: "/users", icon: User },
  { label: "Recipes", path: "/recipes", icon: ShoppingCart },
  { label: "Sales", path: "/sales", icon: DollarSign },
  { label: "Messages", path: "/messages", icon: Mail },
  { label: "Help", path: "/help", icon: HelpCircle },
  { label: "Settings", path: "/settings", icon: Settings },
];
