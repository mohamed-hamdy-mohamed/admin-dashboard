"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsSkeletonProps {
  cards?: number;
}

const StatsCardsSkeleton = ({ cards = 4 }: StatsCardsSkeletonProps) => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: cards }).map((_, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-9 w-20" />

                <Skeleton className="h-3 w-36" />
              </div>

              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default StatsCardsSkeleton;
