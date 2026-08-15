"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/atoms/ui/input";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder,
  containerClassName,
  inputClassName,
}: SearchFieldProps) => {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Search
        size={18}
        className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn("h-11 rounded-xl ps-10", inputClassName)}
      />
    </div>
  );
};

export default SearchField;
