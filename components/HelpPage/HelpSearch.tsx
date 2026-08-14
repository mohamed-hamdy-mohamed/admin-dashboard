"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HelpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const HelpSearch = ({ value, onChange }: HelpSearchProps) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search FAQs..."
        className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm"
      />
    </div>
  );
};

export default HelpSearch;
