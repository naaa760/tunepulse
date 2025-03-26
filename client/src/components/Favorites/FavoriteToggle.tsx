"use client";

import { useState } from "react";
import { toggleFavorite } from "@/lib/favoriteService";
import styles from "./FavoriteToggle.module.css";

interface FavoriteToggleProps {
  songId: string;
  initialState: boolean;
  isLoading: boolean;
}

export default function FavoriteToggle({
  songId,
  initialState,
  isLoading,
}: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      await toggleFavorite(songId);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
