"use client";
import { sidebarRoutes } from "@/constants/sidebar-routes";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "h-screen bg-slate-800 text-white px-2 py-5 transition-all duration-300",
        isSideBarOpen ? "w-64" : "w-20",
      )}
    >
      {/* Expanding Menu */}
      <button
        aria-label="Toggle Sidebar"
        className="text-lg font-semibold px-3 py-3 mb-4 cursor-pointer hover:bg-slate-700 rounded-xl"
        onClick={() => setIsSideBarOpen((prev) => !prev)}
      >
        <Menu />
      </button>

      <nav>
        <ul>
          {sidebarRoutes.map((route) => (
            <li key={route.path} className="mb-2">
              <Link
                href={route.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors",
                  pathname === route.path ? "bg-gray-700" : "",
                )}
              >
                <route.icon
                  className={cn("h-5 w-5", isSideBarOpen ? "mr-2" : "mx-auto")}
                />
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isSideBarOpen ? "w-auto opacity-100" : "w-0 opacity-0",
                  )}
                >
                  {route.label}
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
