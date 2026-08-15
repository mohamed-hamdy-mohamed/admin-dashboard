"use client";

import SearchField from "@/components/molecules/SearchField";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <SearchField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      containerClassName="lg:max-w-sm"
    />
  );
};

export default SearchInput;
