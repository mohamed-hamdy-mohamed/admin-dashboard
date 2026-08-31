"use client";

import RouteGuard from "@/shared/organisms/RouteGuard";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return <RouteGuard requireAuth>{children}</RouteGuard>;
};

export default AuthGuard;
