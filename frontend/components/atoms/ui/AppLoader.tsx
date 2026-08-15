"use client";

import { LoaderCircle } from "lucide-react";

const AppLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default AppLoader;
