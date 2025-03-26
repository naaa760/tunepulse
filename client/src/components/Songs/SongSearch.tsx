import React, { useState, useCallback } from "react";
import styles from "./SongSearch.module.css";

interface SongSearchProps {
  onSearch: (query: string) => void;
}

const SongSearch: React.FC<SongSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchQuery);
    },
    [searchQuery, onSearch]
  );

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Search songs by title, artist, or album..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <span className={styles.searchIcon}>🔍</span>
        </button>
      </div>
    </form>
  );
};

// Debounce helper function
function debounce<T extends (arg: string) => void>(
  func: T,
  wait: number
): (arg: string) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (arg: string) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(arg), wait);
  };
}

export default SongSearch;
