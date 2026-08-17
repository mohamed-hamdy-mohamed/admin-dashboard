const ChartSkeleton = () => {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 space-y-2 sm:mb-6">
        <div className="h-5 w-40 rounded bg-muted" />
        <div className="h-4 w-56 rounded bg-muted" />
      </div>
      <div className="h-56 rounded-lg bg-muted sm:h-64 md:h-80" />
    </div>
  );
};

export default ChartSkeleton;
