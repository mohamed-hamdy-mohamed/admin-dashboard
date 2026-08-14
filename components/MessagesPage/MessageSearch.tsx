"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageSearch = ({ value, onChange }: MessageSearchProps) => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search conversations..."
        className="h-11 rounded-xl pl-10"
      />
    </div>
  );
};

export default MessageSearch;
