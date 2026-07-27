"use client";

import { Badge } from "@/components/ui/badge";

interface UserStatusBadgeProps {
  id: number;
}

const UserStatusBadge = ({ id }: UserStatusBadgeProps) => {
  const isActive = id % 3 !== 0;

  return isActive ? (
    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
      ● Active
    </Badge>
  ) : (
    <Badge variant="secondary">● Offline</Badge>
  );
};

export default UserStatusBadge;
