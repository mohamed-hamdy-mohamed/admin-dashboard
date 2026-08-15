"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTranslation } from "@/providers/LanguageProvider";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const { direction } = useTranslation();

  return (
    <div dir={direction} className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
