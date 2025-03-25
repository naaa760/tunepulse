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
        className="w-full px-6 py-4 rounded-xl border-2 border-white/20 
          bg-white/10 backdrop-blur-sm
          focus:outline-none focus:border-white/40
          text-white text-lg placeholder-white/60
          transition-all duration-200"
      />
    </div>
  );
};
