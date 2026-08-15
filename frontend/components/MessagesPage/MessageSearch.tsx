"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/providers/LanguageProvider";

interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageSearch = ({ value, onChange }: MessageSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute top-1/2 start-3 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("messages.searchPlaceholder")}
        className="h-11 rounded-xl ps-10"
      />
    </div>
  );
};

export default MessageSearch;
