import CardSkeleton from "@/components/skeletons/CardSkeleton";
import PageSectionSkeleton from "@/components/skeletons/PageSectionSkeleton";
import StatsCardsSkeleton from "@/components/skeletons/StatsCardsSkeleton";

interface PageLoadingSkeletonProps {
  cards?: number;
}

const PageLoadingSkeleton = ({ cards = 4 }: PageLoadingSkeletonProps) => {
  return (
    <div className="space-y-6">
      <StatsCardsSkeleton cards={cards} />
      <PageSectionSkeleton>
        <CardSkeleton variant="plain" />
      </PageSectionSkeleton>
    </div>
  );
};

export default PageLoadingSkeleton;
