import { memo } from "react";
import StatCard from "@/shared/atoms/StatCard";
import type { Stats } from "@/types/stats";

interface StatsCardProps {
  stats: Stats[];
}

const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="animate-in fade-in slide-in-from-bottom-5 fill-mode-both duration-300"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <StatCard stat={stat} />
        </div>
      ))}
    </section>
  );
};

export default memo(StatsCard);
