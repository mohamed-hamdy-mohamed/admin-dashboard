import Image from "next/image";
import Egy from "@/public/Egy.png";
import AdminPic from "@/public/Profile-picture.png";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        {/* Header Title  */}
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        {/* Country Flag  */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src={Egy}
            alt="country flag"
            width={25}
            height={18}
            className="rounded-full shadow-md cursor-pointer hover:scale-105 "
          />
          <div className="p-2 rounded-full hover:bg-slate-600">
            <Bell className="text-white w-5 h-5 cursor-pointer" />
          </div>
          {/* Avatar  */}
          <Avatar>
            <AvatarImage
              src={AdminPic.src}
              alt="Admin Profile Picture"
            ></AvatarImage>
          </Avatar>
          <span className="text-white font-semibold">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
