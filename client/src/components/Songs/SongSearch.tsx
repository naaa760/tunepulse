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
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
