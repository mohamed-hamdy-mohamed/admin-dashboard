import {
  Bell,
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
  { label: "Sales", path: "/sales", icon: DollarSign },
  { label: "Orders", path: "/orders", icon: ShoppingCart },
  { label: "Messages", path: "/messages", icon: Mail },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Help", path: "/help", icon: HelpCircle },
  { label: "Settings", path: "/settings", icon: Settings },
];
