"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="pl-10 h-11 rounded-xl"
      />
    </div>
  );
};

export default SearchInput;
