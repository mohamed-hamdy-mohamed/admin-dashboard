import type { ReactNode } from "react";

interface DetailGridProps {
  children: ReactNode;
}

const DetailGrid = ({ children }: DetailGridProps) => {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
};

export default DetailGrid;
