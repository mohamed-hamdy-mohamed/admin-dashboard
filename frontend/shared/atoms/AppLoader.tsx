"use client";

import { LoaderCircle } from "lucide-react";

const AppLoader = () => {
  return (
    <div
      className="flex h-screen items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
    </div>
  );
};

export default AppLoader;
