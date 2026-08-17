"use client";

import dynamic from "next/dynamic";
import ChartsGridSkeleton from "./ChartsGridSkeleton";

const DashboardCharts = dynamic(() => import("./DashboardCharts"), {
  ssr: false,
  loading: () => <ChartsGridSkeleton />,
});

const LazyDashboardCharts = () => {
  return <DashboardCharts />;
};

export default LazyDashboardCharts;
