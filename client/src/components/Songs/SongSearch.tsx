"use client";

import { useState } from "react";

interface SongSearchProps {
  onSearch: (query: string) => void;
}

export const SongSearch = ({ onSearch }: SongSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
