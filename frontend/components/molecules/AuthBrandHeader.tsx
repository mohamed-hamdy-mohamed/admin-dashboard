"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthBrandHeaderProps {
  title: string;
  className?: string;
}

const AuthBrandHeader = ({ title, className }: AuthBrandHeaderProps) => {
  return (
    <div className={cn("mb-9 flex items-center gap-3", className)}>
      <div className="size-10 shrink-0">
        <Image
          src="/favicon-rounded.svg"
          alt="Admin Operations Platform"
          width={40}
          height={40}
          className="size-10 border-0 outline-none"
          priority
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Admin Operations Platform
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default AuthBrandHeader;
