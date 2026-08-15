"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarRoutes } from "@/constants/sidebar-routes";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/providers/LanguageProvider";

interface SidebarProps {
  isDesktop: boolean;
  isDesktopExpanded: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

const Sidebar = ({
  isDesktop,
  isDesktopExpanded,
  isMobileOpen,
  onToggle,
  onCloseMobile,
}: SidebarProps) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isMobileDrawerActive = !isDesktop && isMobileOpen;

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-e border-sidebar-border bg-sidebar px-2 py-5 text-sidebar-foreground",
        "fixed inset-y-0 start-0 z-50 w-64 transition-[transform,width] duration-300",
        "lg:static lg:z-auto",
        isMobileOpen
          ? "max-lg:pointer-events-auto max-lg:translate-x-0"
          : "max-lg:pointer-events-none max-lg:-translate-x-full rtl:max-lg:translate-x-full",
        isDesktopExpanded ? "lg:w-64" : "lg:w-20",
      )}
    >
      <button
        type="button"
        aria-label={t("aria.toggleSidebar")}
        aria-expanded={isDesktop ? isDesktopExpanded : isMobileDrawerActive}
        className="mb-4 cursor-pointer rounded-xl px-3 py-3 text-lg font-semibold hover:bg-sidebar-accent"
        onClick={onToggle}
      >
        <Menu />
      </button>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        <ul>
          {sidebarRoutes.map((route) => (
            <li key={route.path} className="mb-2">
              <Link
                href={route.path}
                prefetch={false}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center rounded-xl px-4 py-3 transition-colors hover:bg-sidebar-accent",
                  pathname === route.path ? "bg-sidebar-accent" : "",
                )}
              >
                <route.icon
                  className={cn(
                    "h-5 w-5 max-lg:me-2",
                    isDesktopExpanded ? "lg:me-2" : "lg:mx-auto",
                  )}
                />
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    "max-lg:w-auto max-lg:opacity-100",
                    isDesktopExpanded
                      ? "lg:w-auto lg:opacity-100"
                      : "lg:w-0 lg:opacity-0",
                  )}
                >
                  {t(route.labelKey)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
