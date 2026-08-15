"use client";

import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/providers/LanguageProvider";

interface OrderDifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard";
}

const difficultyStyles = {
  Easy: {
    key: "recipes.difficulty.easy",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
  },
  Medium: {
    key: "recipes.difficulty.medium",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-100",
  },
  Hard: {
    key: "recipes.difficulty.hard",
    className: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100",
  },
} as const;

const RecipeDifficultyBadge = ({ difficulty }: OrderDifficultyBadgeProps) => {
  const { t } = useTranslation();
  const status = difficultyStyles[difficulty];

  return (
    <Badge variant="outline" className={`font-medium ${status.className}`}>
      {t(status.key)}
    </Badge>
  );
};

export default RecipeDifficultyBadge;
