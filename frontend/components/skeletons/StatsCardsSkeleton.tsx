import { memo } from "react";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import PageSectionSkeleton from "@/components/skeletons/PageSectionSkeleton";

interface StatsCardsSkeletonProps {
  cards?: number;
}

const StatsCardsSkeleton = ({ cards = 4 }: StatsCardsSkeletonProps) => {
  return (
    <PageSectionSkeleton className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {Array.from({ length: cards }, (_, index) => (
        <CardSkeleton key={index} variant="stat" />
      ))}
    </PageSectionSkeleton>
  );
};

export default memo(StatsCardsSkeleton);
