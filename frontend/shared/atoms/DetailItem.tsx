import type { ReactNode } from "react";

interface DetailItemProps {
  label: string;
  value: ReactNode;
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
};

export default DetailItem;
