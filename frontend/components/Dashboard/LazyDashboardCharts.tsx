"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChartsGridSkeleton from "./ChartsGridSkeleton";

const DashboardCharts = dynamic(() => import("./DashboardCharts"), {
  ssr: false,
  loading: () => <ChartsGridSkeleton />,
});

const LazyDashboardCharts = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(load, { timeout: 200 });

      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const frame = requestAnimationFrame(load);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!shouldLoad) {
    return <ChartsGridSkeleton />;
  }

  return <DashboardCharts />;
};

export default LazyDashboardCharts;
