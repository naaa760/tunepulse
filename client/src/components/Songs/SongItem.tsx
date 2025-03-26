"use client";

import { useState, useEffect } from "react";
import { Song } from "@/types/Song";
import FavoriteToggle from "@/components/Favorites/FavoriteToggle";
import { isFavorite } from "@/lib/favoriteService";
import styles from "./SongItem.module.css";

interface SongItemProps {
  song: Song;
}

export default function SongItem({ song }: SongItemProps) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFavorite() {
      try {
        const result = await isFavorite(song.id);
        setFavorite(result);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setLoading(false);
      }
    }

    checkFavorite();
  }, [song.id]);

  return (
    <div className={styles.songItem}>
      <div className={styles.songInfo}>
        {song.albumArt && (
          <img
            src={song.albumArt}
            alt={`${song.title} album art`}
            className={styles.albumArt}
          />
        )}
        <div className={styles.details}>
          <h3 className={styles.title}>{song.title}</h3>
          <p className={styles.artist}>{song.artist}</p>
        </div>
      </div>
      <div className={styles.controls}>
        {song.previewUrl && (
          <audio controls className={styles.audioPlayer}>
            <source src={song.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <FavoriteToggle
          songId={song.id}
          initialState={favorite}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
