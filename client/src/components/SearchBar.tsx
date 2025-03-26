"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search for songs, artists, or albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-gray-800 border-gray-700 text-white"
      />
      <Button type="submit" className="bg-green-500 hover:bg-green-600">
        Search
      </Button>
    </form>
  );
}
