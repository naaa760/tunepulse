import { Song } from "@/types/Song";
import { FavoriteToggle } from "../Favorites/FavoriteToggle";

interface SongItemProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: (songId: number) => void;
}

export const SongItem = ({
  song,
  isFavorite,
  onToggleFavorite,
}: SongItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        {song.albumArt && (
          <img
            src={song.albumArt}
            alt={`${song.title} album art`}
            className="w-12 h-12 rounded"
          />
        )}
        <div>
          <h3 className="font-medium">{song.title}</h3>
          <p className="text-sm text-gray-600">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{song.duration}</span>
        <FavoriteToggle
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(song.id)}
        />
      </div>
    </div>
  );
};
