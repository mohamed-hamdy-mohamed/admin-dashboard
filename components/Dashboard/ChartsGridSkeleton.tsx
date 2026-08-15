import ChartSkeleton from "./ChartSkeleton";

const ChartsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <ChartSkeleton key={index} />
      ))}
    </div>
  );
};

export default ChartsGridSkeleton;
