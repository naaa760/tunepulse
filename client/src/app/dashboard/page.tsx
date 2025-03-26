"use client";

import { useState, useEffect } from "react";
import SongList from "@/components/Songs/SongList";
import SongSearch from "@/components/Songs/SongSearch";
import { getSongs } from "@/lib/songService";
import { Song } from "@/types/Song";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { MdFavorite, MdSearch, MdMusicNote } from "react-icons/md";

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async (query?: string) => {
    try {
      setLoading(true);
      const songsData = await getSongs(query);
      setSongs(songsData);
      setError(null);
    } catch (err) {
      setError("Failed to load songs. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    loadSongs(query);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.header}>
          <h1>
            <MdMusicNote className={styles.icon} /> TunePulse
          </h1>
          <p className={styles.subtitle}>
            Discover and enjoy your favorite music
          </p>
        </div>

        <div className={styles.actions}>
          <SongSearch onSearch={handleSearch} />
          <Link href="/favorites" className={styles.favoritesButton}>
            <MdFavorite className={styles.buttonIcon} />
            <span>My Favorites</span>
          </Link>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading amazing music...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>!</div>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && songs.length === 0 && (
          <div className={styles.emptyState}>
            <MdSearch className={styles.emptyIcon} />
            <h2>No songs found</h2>
            <p>Try searching for something else or check back later</p>
          </div>
        )}

        {!loading && !error && songs.length > 0 && (
          <div className={styles.songListContainer}>
            <SongList songs={songs} />
          </div>
        )}
      </div>
    </div>
  );
}
