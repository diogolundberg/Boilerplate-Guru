
import React from 'react';

interface SearchInputProperties {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProperties> = ({ 
  value, 
  onChange, 
  placeholder = "Search catalog..." 
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="block w-full px-6 py-4 text-lg pixel-border bg-white text-[#2A1A12] placeholder-[#E6D3B6] outline-none focus:ring-4 focus:ring-[#D47833]/30 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pixel-font text-[10px] text-[#D47833] pointer-events-none hidden sm:block">
        [ENTER]
      </div>
    </div>
  );
};
