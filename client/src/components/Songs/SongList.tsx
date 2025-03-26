import React, { useState, useEffect } from "react";
import { Song } from "../../types/Song";
import SongItem from "./SongItem";
import {
  checkIsFavorite,
  addFavorite,
  removeFavorite,
} from "../../lib/favoriteService";
import styles from "./SongList.module.css";

interface SongListProps {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

const SongList: React.FC<SongListProps> = ({ songs, isLoading, error }) => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Load favorite status for all songs
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      const favoriteStatuses: Record<number, boolean> = {};

      for (const song of songs) {
        favoriteStatuses[song.id] = await checkIsFavorite(song.id);
      }

      setFavorites(favoriteStatuses);
    };

    if (songs.length > 0) {
      loadFavoriteStatus();
    }
  }, [songs]);

  const handleToggleFavorite = async (songId: number) => {
    try {
      if (favorites[songId]) {
        await removeFavorite(songId);
      } else {
        await addFavorite(songId);
      }

      // Update the favorite status
      setFavorites((prev) => ({
        ...prev,
        [songId]: !prev[songId],
      }));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading songs...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (songs.length === 0) {
    return <div className={styles.empty}>No songs found</div>;
  }

  return (
    <div className={styles.songList}>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          isFavorite={favorites[song.id] || false}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default SongList;
