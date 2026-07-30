import { UsersResponse } from "@/types/users";
import { Cake, Globe, LucideIcon, ShieldCheck, Users } from "lucide-react";
import StatsCard from "../ui/StatsCard";

interface UsersStatsProps {
  data: UsersResponse;
}

const UsersStats = ({ data }: UsersStatsProps) => {
  const users = data?.users ?? [];
  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === "admin").length ?? 0;
  const countries =
    new Set(users.map((user) => user.address.country)).size ?? 0;

  const averageAge = (
    users.reduce((sum, user) => sum + user.age, 0) / totalUsers
  ).toFixed(1);

  interface Stat {
    title: string;
    value: number | string;
    description?: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
  }
  const stats: Stat[] = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered users",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      description: "Users with admin role",
      icon: ShieldCheck,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Countries",
      value: countries,
      description: "Unique countries",
      icon: Globe,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Average Age",
      value: averageAge,
      description: "Average age of users",
      icon: Cake,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return <StatsCard stats={stats} />;
};

export default UsersStats;
