import { Card, CardContent } from "@/components/atoms/ui/card";
import type { LucideIcon } from "lucide-react";

interface Stat {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

interface StatsCardProps {
  stats: Stat[];
}

const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="animate-in fade-in slide-in-from-bottom-5 fill-mode-both duration-300"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Card className="border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {/* Title  */}
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>

                    {/* Value  */}
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                      {stat.value}
                    </h2>

                    {/* Description  */}
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
          </div>
        );
      })}
    </section>
  );
};

export default StatsCard;
