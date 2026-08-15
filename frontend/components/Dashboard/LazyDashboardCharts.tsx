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
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        setShouldLoad(true);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, []);

  if (!shouldLoad) {
    return <ChartsGridSkeleton />;
  }

  return <DashboardCharts />;
};

export default LazyDashboardCharts;
