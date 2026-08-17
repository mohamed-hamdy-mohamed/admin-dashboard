"use client";

import { memo, useEffect, useRef, useState, type ReactNode } from "react";

export interface ChartSize {
  width: number;
  height: number;
}

interface MeasuredChartProps {
  children: (size: ChartSize) => ReactNode;
}

const SIZE_SNAP = 4;

const MeasuredChart = ({ children }: MeasuredChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ChartSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let frame = 0;

    const updateSize = (width: number, height: number) => {
      const nextWidth = Math.round(width / SIZE_SNAP) * SIZE_SNAP;
      const nextHeight = Math.round(height / SIZE_SNAP) * SIZE_SNAP;

      if (nextWidth < 1 || nextHeight < 1) {
        return;
      }

      setSize((current) =>
        current.width === nextWidth && current.height === nextHeight
          ? current
          : { width: nextWidth, height: nextHeight },
      );
    };

    updateSize(element.clientWidth, element.clientHeight);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        updateSize(entry.contentRect.width, entry.contentRect.height);
      });
    });

    observer.observe(element);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const isReady = size.width > 0 && size.height > 0;

  return (
    <div ref={ref} className="h-full w-full">
      {isReady ? (
        children(size)
      ) : (
        <div className="h-full w-full rounded-lg bg-muted" aria-hidden />
      )}
    </div>
  );
};

export default memo(MeasuredChart);
