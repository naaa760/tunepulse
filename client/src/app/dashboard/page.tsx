"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SongList from "../../components/Songs/SongList";
import SongSearch from "../../components/Songs/SongSearch";
import { searchSongs } from "../../lib/songService";
import { Song } from "../../types/Song";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("Top Hits");

  // List of music categories to choose from
  const categories = [
    "Top Hits",
    "Rock Classics",
    "Hip Hop",
    "Pop",
    "Electronic",
    "Jazz",
    "Classical",
  ];

  useEffect(() => {
    const loadSongsByCategory = async (categoryName: string) => {
      setIsLoading(true);
      try {
        const data = await searchSongs(categoryName);
        if (data && data.length > 0) {
          setSongs(data);
          setError(null);
        } else {
          // Handle empty results
          setSongs([]);
          setError("No songs found. Try a different category.");
          console.log("No songs found for category:", categoryName);
        }
      } catch (err) {
        console.error("Error loading songs:", err);
        setError("Failed to load songs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSongsByCategory(category);
  }, [category]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      if (query.trim() === "") {
        loadSongsByCategory(category);
      } else {
        const results = await searchSongs(query);
        setSongs(results);
      }
      setError(null);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎵</span>
          <span className={styles.logoText}>Music App</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`${styles.navLink} ${styles.active}`}
          >
            Dashboard
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Music Dashboard</h1>

        <div className={styles.searchContainer}>
          <SongSearch onSearch={handleSearch} />
        </div>

        <div className={styles.categoriesContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryButton} ${
                category === cat ? styles.active : ""
              }`}
              onClick={() => {
                setCategory(cat);
                setSearchQuery("");
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.contentContainer}>
          <h2 className={styles.sectionTitle}>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : `${category} Songs`}
          </h2>

          <SongList songs={songs} isLoading={isLoading} error={error} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 Music App. All rights reserved.</p>
      </footer>
    </div>
  );
}
