"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/ui/AppLoader";
import { useAuth } from "@/providers/AuthProvider";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isReady, router]);

  if (isReady && isAuthenticated) {
    return <AppLoader />;
  }

  return children;
};

export default GuestGuard;
