import { Card, CardContent } from "@/shared/atoms/card";
import type { Stats } from "@/types/stats";

interface StatCardProps {
  stat: Stats;
}

const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;

  return (
    <Card className="border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {stat.value}
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${stat.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
