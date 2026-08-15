"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/providers/LanguageProvider";

interface HelpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const HelpSearch = ({ value, onChange }: HelpSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={18}
        className="absolute top-1/2 start-3 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("help.faq.searchPlaceholder")}
        className="h-11 rounded-xl border-border bg-card ps-10 shadow-sm"
      />
    </div>
  );
};

export default HelpSearch;
