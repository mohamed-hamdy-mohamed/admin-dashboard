import CardSkeleton from "@/components/skeletons/CardSkeleton";
import PageSectionSkeleton from "@/components/skeletons/PageSectionSkeleton";

const ChartsGridSkeleton = () => {
  return (
    <PageSectionSkeleton className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {Array.from({ length: 4 }, (_, index) => (
        <CardSkeleton key={index} variant="chart" />
      ))}
    </PageSectionSkeleton>
  );
};

export default ChartsGridSkeleton;
