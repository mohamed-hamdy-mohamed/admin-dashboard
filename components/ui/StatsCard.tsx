"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};
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
    <motion.section
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    {/* Title  */}
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>

                    {/* Value  */}
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">
                      {stat.value}
                    </h2>

                    {/* Description  */}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default StatsCard;
