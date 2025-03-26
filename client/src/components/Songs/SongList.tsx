import styles from "./SongList.module.css";
import { Song } from "@/types/Song";
import Image from "next/image";
import FavoriteButton from "../Favorites/FavoriteButton";
import { MdPlayArrow } from "react-icons/md";

interface SongListProps {
  songs: Song[];
}

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const playSong = (previewUrl: string | null | undefined) => {
    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audio.play();
    } else {
      alert("No preview available for this song");
    }
  };

  return (
    <div className={styles.container}>
      {songs.map((song) => (
        <div key={song.id} className={styles.songCard}>
          <div className={styles.albumArt}>
            {song.albumArt ? (
              <Image
                src={song.albumArt}
                alt={`${song.title} album art`}
                width={80}
                height={80}
                className={styles.albumImage}
              />
            ) : (
              <div className={styles.noAlbumArt}>
                <span>No Image</span>
              </div>
            )}
          </div>
          <div className={styles.songInfo}>
            <h3 className={styles.title}>{song.title}</h3>
            <p className={styles.artist}>{song.artist}</p>
          </div>
          <div className={styles.actions}>
            {song.previewUrl && (
              <button
                className={styles.playButton}
                onClick={() => playSong(song.previewUrl)}
                aria-label="Play preview"
              >
                <MdPlayArrow />
              </button>
            )}
            <FavoriteButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
