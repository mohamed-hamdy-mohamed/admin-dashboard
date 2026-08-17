const ChartSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-6 space-y-2">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-56 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-56 animate-pulse rounded-lg bg-muted sm:h-64 md:h-80" />
    </div>
  );
};

export default ChartSkeleton;
