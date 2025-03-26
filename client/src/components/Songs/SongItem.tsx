import React from "react";
import Image from "next/image";
import { Song } from "../../types/Song";
import FavoriteToggle from "../Favorites/FavoriteToggle";
import styles from "./SongItem.module.css";

interface SongItemProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: (songId: number) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  isFavorite,
  onToggleFavorite,
}) => {
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.songItem}>
      <div className={styles.imageContainer}>
        {song.imageUrl ? (
          <Image
            src={song.imageUrl}
            alt={`${song.title} by ${song.artist}`}
            width={60}
            height={60}
            className={styles.albumCover}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span>🎵</span>
          </div>
        )}
      </div>

      <div className={styles.songInfo}>
        <h3 className={styles.title}>{song.title}</h3>
        <p className={styles.artist}>{song.artist}</p>
        {song.album && <p className={styles.album}>{song.album}</p>}
      </div>

      <div className={styles.songMeta}>
        {song.genre && <span className={styles.genre}>{song.genre}</span>}
        <span className={styles.duration}>{formatDuration(song.duration)}</span>
      </div>

      <div className={styles.actions}>
        <FavoriteToggle
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(song.id)}
        />
      </div>
    </div>
  );
};

export default SongItem;
