"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/providers/LanguageProvider";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const { direction, t } = useTranslation();
  const pathname = usePathname();
  const isDesktop = useMediaQuery(MEDIA_QUERIES.lg);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const isMobileOpen = mobileOpenPath === pathname && !isDesktop;

  useLockBodyScroll(isMobileOpen);

  const closeMobileSidebar = useCallback(() => {
    setMobileOpenPath(null);
  }, []);

  const openMobileSidebar = useCallback(() => {
    setMobileOpenPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileSidebar, isMobileOpen]);

  const handleSidebarToggle = () => {
    if (isDesktop) {
      setIsDesktopExpanded((previous) => !previous);
      return;
    }

    setMobileOpenPath((previous) => (previous === pathname ? null : pathname));
  };

  return (
    <div dir={direction} className="flex h-screen overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        {t("aria.skipToMain")}
      </a>

      {isMobileOpen ? (
        <button
          type="button"
          aria-label={t("aria.closeSidebar")}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ease-out lg:hidden"
          onClick={closeMobileSidebar}
        />
      ) : null}

      <Sidebar
        isDesktop={isDesktop}
        isDesktopExpanded={isDesktopExpanded}
        isMobileOpen={isMobileOpen}
        onToggle={handleSidebarToggle}
        onCloseMobile={closeMobileSidebar}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onOpenMobileSidebar={openMobileSidebar} />

        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "min-h-0 flex-1",
            isMobileOpen ? "overflow-hidden lg:overflow-y-auto" : "overflow-y-auto",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
