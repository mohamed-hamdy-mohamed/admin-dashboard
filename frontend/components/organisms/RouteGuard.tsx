"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/atoms/ui/AppLoader";
import { useAuth } from "@/providers/AuthProvider";

interface RouteGuardProps {
  children: ReactNode;
  requireAuth: boolean;
}

const RouteGuard = ({ children, requireAuth }: RouteGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (requireAuth && !isAuthenticated) {
      router.replace("/login");
    }

    if (!requireAuth && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isReady, requireAuth, router]);

  if (!isReady) {
    return <AppLoader />;
  }

  if (requireAuth && !isAuthenticated) {
    return <AppLoader />;
  }

  if (!requireAuth && isAuthenticated) {
    return <AppLoader />;
  }

  return children;
};

export default RouteGuard;
