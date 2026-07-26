"use client";

import { Skeleton } from "./skeleton";

const ProductsStatsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <Skeleton className="h-12 w-12 rounded-xl" />

            <Skeleton className="h-5 w-20" />
          </div>

          <div className="mt-8 space-y-3">
            <Skeleton className="h-8 w-20" />

            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductsStatsSkeleton;
