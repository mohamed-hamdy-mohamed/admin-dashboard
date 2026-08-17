import { memo, type ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <section
      aria-label={`${title}. ${subtitle}`}
      className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6 contain-layout"
    >
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="h-56 sm:h-64 md:h-80">{children}</div>
    </section>
  );
};

export default memo(ChartCard);
