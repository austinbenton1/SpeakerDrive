import React from 'react';
import { Search } from 'lucide-react';

interface FilterSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function FilterSearch({ value, onChange, placeholder }: FilterSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}