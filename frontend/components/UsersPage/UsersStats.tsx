"use client";

import { useMemo } from "react";
import { UsersResponse } from "@/types/users";
import { Cake, Globe, ShieldCheck, Users } from "lucide-react";
import StatsCard from "../atoms/ui/StatsCard";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatDecimal, formatNumber } from "@/util/formatNumber";

interface UsersStatsProps {
  data: UsersResponse;
}

const UsersStats = ({ data }: UsersStatsProps) => {
  const { locale, t } = useTranslation();
  const users = data?.users ?? [];
  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === "admin").length ?? 0;
  const countries =
    new Set(users.map((user) => user.address.country)).size ?? 0;

  const averageAge =
    totalUsers > 0
      ? users.reduce((sum, user) => sum + user.age, 0) / totalUsers
      : 0;

  const stats = useMemo<Stats[]>(
    () => [
      {
        title: t("users.stats.totalUsers.title"),
        value: formatNumber(totalUsers, locale),
        description: t("users.stats.totalUsers.description"),
        icon: Users,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: t("users.stats.adminUsers.title"),
        value: formatNumber(adminUsers, locale),
        description: t("users.stats.adminUsers.description"),
        icon: ShieldCheck,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
      {
        title: t("users.stats.countries.title"),
        value: formatNumber(countries, locale),
        description: t("users.stats.countries.description"),
        icon: Globe,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        title: t("users.stats.averageAge.title"),
        value: formatDecimal(averageAge, locale, 1),
        description: t("users.stats.averageAge.description"),
        icon: Cake,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
    ],
    [adminUsers, averageAge, countries, locale, t, totalUsers],
  );

  return <StatsCard stats={stats} />;
};

export default UsersStats;
