import { Song } from "@/types/Song";
import SongItem from "./SongItem";
import styles from "./SongList.module.css";

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
  if (songs.length === 0) {
    return <div className={styles.empty}>No songs found</div>;
  }

  return (
    <div className={styles.songList}>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}
