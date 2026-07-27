"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, User } from "lucide-react";

interface UserRoleBadgeProps {
  role: "admin" | "moderator" | "user";
}

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  switch (role) {
    case "admin":
      return (
        <Badge className="gap-1 bg-violet-100 text-violet-700 hover:bg-violet-100">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </Badge>
      );

    case "moderator":
      return (
        <Badge className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Shield className="h-3.5 w-3.5" />
          Moderator
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary" className="gap-1">
          <User className="h-3.5 w-3.5" />
          User
        </Badge>
      );
  }
};

export default UserRoleBadge;
