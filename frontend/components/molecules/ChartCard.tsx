import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <div className="min-w-0 animate-in fade-in slide-in-from-bottom-5 rounded-xl border border-border bg-card p-4 shadow-sm fill-mode-both duration-500 delay-200 sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="h-56 sm:h-64 md:h-80">{children}</div>
    </div>
  );
};

export default ChartCard;
