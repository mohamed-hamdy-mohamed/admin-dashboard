"use client";

import SearchField from "@/shared/molecules/SearchField";
import { useTranslation } from "@/providers/LanguageProvider";

interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageSearch = ({ value, onChange }: MessageSearchProps) => {
  const { t } = useTranslation();

  return (
    <SearchField
      value={value}
      onChange={onChange}
      placeholder={t("messages.searchPlaceholder")}
    />
  );
};

export default MessageSearch;
