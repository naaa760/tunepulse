"use client";
import { useEffect, useState } from "react";
import { Favorite } from "@/types/Favorite";
import { Song } from "@/types/Song";
import { getFavorites } from "@/lib/favoriteService";
import SongList from "@/components/Songs/SongList";
import Link from "next/link";
import styles from "./favorites.module.css";
import { MdArrowBack, MdMusicOff, MdFavorite } from "react-icons/md";

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
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>
            <MdFavorite className={styles.icon} />
            Your Favorites
          </h1>
          <Link href="/dashboard" className={styles.backButton}>
            <MdArrowBack className={styles.buttonIcon} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your favorites...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>!</div>
            <p>{error}</p>
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <div className={styles.emptyState}>
            <MdMusicOff className={styles.emptyIcon} />
            <h2>No favorites yet</h2>
            <p>Start adding songs you love to your favorites!</p>
            <Link href="/dashboard" className={styles.actionButton}>
              Discover Songs
            </Link>
          </div>
        )}

        {favorites.length > 0 && (
          <div className={styles.favoritesContainer}>
            <div className={styles.favoritesCount}>
              <span>{favorites.length}</span> favorite song
              {favorites.length !== 1 ? "s" : ""}
            </div>
            <div className={styles.songList}>
              <SongList songs={songs} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
