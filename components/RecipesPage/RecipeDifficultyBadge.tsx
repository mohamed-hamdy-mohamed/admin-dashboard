"use client";

import { Badge } from "@/components/ui/badge";

interface OrderDifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard";
}

const difficultyStyles = {
  Easy: {
    label: "Easy",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
  },
  Medium: {
    label: "Medium",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-100",
  },
  Hard: {
    label: "Hard",
    className: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100",
  },
} as const;

const RecipeDifficultyBadge = ({ difficulty }: OrderDifficultyBadgeProps) => {
  const status = difficultyStyles[difficulty];

  return (
    <Badge variant="outline" className={`font-medium ${status.className}`}>
      {status.label}
    </Badge>
  );
};

export default RecipeDifficultyBadge;
