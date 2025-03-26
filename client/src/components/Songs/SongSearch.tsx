"use client";

import { useState } from "react";
import styles from "./SongSearch.module.css";
import { MdSearch } from "react-icons/md";

interface SongSearchProps {
  onSearch: (query: string) => void;
}

export default function SongSearch({ onSearch }: SongSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs, artists, or albums..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <MdSearch className={styles.searchIcon} />
        Search
      </button>
    </form>
  );
}
