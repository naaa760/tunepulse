"use client";
import { useEffect, useState } from "react";
import { Favorite } from "@/types/Favorite";
import { getFavorites } from "@/lib/favoriteService";
import SongList from "@/components/Songs/SongList";
import Link from "next/link";
import styles from "./favorites.module.css";
import { Song } from "@/types/Song";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        setError("Failed to load favorites");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  const songs = favorites.map((fav) => fav.song).filter(Boolean) as Song[];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Favorites</h1>
        <Link href="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>

      {loading && <p className={styles.loading}>Loading favorites...</p>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && favorites.length === 0 && (
        <div className={styles.empty}>
          <p>You haven&apos;t added any favorites yet.</p>
          <Link href="/dashboard" className={styles.button}>
            Search for songs
          </Link>
        </div>
      )}

      {favorites.length > 0 && (
        <div className={styles.songs}>
          <SongList songs={songs} />
        </div>
      )}
    </div>
  );
}
