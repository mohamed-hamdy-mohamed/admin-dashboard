import ChartSkeleton from "./ChartSkeleton";

const ChartsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <ChartSkeleton key={index} />
      ))}
    </div>
  );
};

export default ChartsGridSkeleton;
