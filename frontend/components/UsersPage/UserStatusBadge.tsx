"use client";

import { memo } from "react";
import { Badge } from "@/shared/atoms/badge";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserStatusBadgeProps {
  id: number;
}

const UserStatusBadge = ({ id }: UserStatusBadgeProps) => {
  const { t } = useTranslation();
  const isActive = id % 3 !== 0;

  return isActive ? (
    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
      ● {t("users.badges.active")}
    </Badge>
  ) : (
    <Badge variant="secondary">● {t("users.badges.offline")}</Badge>
  );
};

export default memo(UserStatusBadge);
