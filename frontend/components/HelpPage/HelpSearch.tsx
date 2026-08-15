"use client";

import SearchField from "@/components/molecules/SearchField";
import { useTranslation } from "@/providers/LanguageProvider";

interface HelpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const HelpSearch = ({ value, onChange }: HelpSearchProps) => {
  const { t } = useTranslation();

  return (
    <SearchField
      value={value}
      onChange={onChange}
      placeholder={t("help.faq.searchPlaceholder")}
      containerClassName="max-w-xl"
      inputClassName="border-border bg-card shadow-sm"
    />
  );
};

export default HelpSearch;
