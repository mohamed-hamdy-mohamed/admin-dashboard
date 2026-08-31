"use client";

import RouteGuard from "@/shared/organisms/RouteGuard";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  return <RouteGuard requireAuth={false}>{children}</RouteGuard>;
};

export default GuestGuard;
