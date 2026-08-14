import dynamic from "next/dynamic";
import Image from "next/image";
import Egy from "@/public/Egy.png";
import AdminPic from "@/public/Profile-picture.png";

const AppNotifications = dynamic(
  () => import("./Header/NotificationsDropdown"),
);

const Header = () => {
  return (
    <header className="mx-4 mb-2 mt-4 rounded-lg border border-sidebar-border bg-sidebar sm:mx-6 lg:mx-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src={Egy}
            alt="country flag"
            width={25}
            height={18}
            sizes="25px"
            className="cursor-pointer rounded-full shadow-md hover:scale-105"
          />
          <AppNotifications />
          <Image
            src={AdminPic}
            alt="Admin Profile Picture"
            width={32}
            height={32}
            sizes="32px"
            className="size-8 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-semibold text-foreground">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
