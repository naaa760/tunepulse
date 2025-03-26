"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SongList from "../../components/Songs/SongList";
import { getFavorites } from "../../lib/favoriteService";
import { Song } from "../../types/Song";
import styles from "./favorites.module.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const data = await getFavorites();
        setFavorites(data);
        setError(null);
      } catch (err) {
        setError("Failed to load favorites. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

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
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link
            href="/favorites"
            className={`${styles.navLink} ${styles.active}`}
          >
            Favorites
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Your Favorites</h1>

        <div className={styles.contentContainer}>
          {favorites.length === 0 && !isLoading ? (
            <div className={styles.emptyState}>
              <p>You haven't added any favorites yet.</p>
              <Link href="/dashboard" className={styles.browseLink}>
                Browse Songs
              </Link>
            </div>
          ) : (
            <SongList songs={favorites} isLoading={isLoading} error={error} />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 Music App. All rights reserved.</p>
      </footer>
    </div>
  );
}
