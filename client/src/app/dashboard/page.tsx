"use client";

import { useState, useEffect } from "react";
import SongList from "@/components/Songs/SongList";
import SongSearch from "@/components/Songs/SongSearch";
import { getSongs } from "@/lib/songService";
import { Song } from "@/types/Song";
import styles from "./dashboard.module.css";
import Link from "next/link";

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
    <div className={styles.dashboard}>
      <h1>Music Dashboard</h1>
      <div className={styles.actions}>
        <SongSearch onSearch={handleSearch} />
        <Link href="/favorites" className={styles.favoritesButton}>
          View Favorites
        </Link>
      </div>

      {loading && <div className={styles.loading}>Loading songs...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <SongList songs={songs} />
    </div>
  );
}
