"use client";

import { useState } from "react";

interface SongSearchProps {
  onSearch: (query: string) => void;
}

export const SongSearch = ({ onSearch }: SongSearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search songs by title or artist..."
        className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 
          bg-white bg-opacity-80 backdrop-blur-sm
          focus:outline-none focus:border-indigo-500
          text-gray-900 text-lg placeholder-gray-500
          transition-all duration-200"
      />
    </div>
  );
};
