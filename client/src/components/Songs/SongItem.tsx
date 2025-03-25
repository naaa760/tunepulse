import { Song } from "@/types/Song";
import { FavoriteToggle } from "../Favorites/FavoriteToggle";
import { useState, useEffect } from "react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element when component mounts
    const audioElement = new Audio(song.previewUrl);
    setAudio(audioElement);

    // Cleanup on unmount
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [song.previewUrl]);

  const handlePlayClick = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Add event listeners for audio
  useEffect(() => {
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio]);

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
        <button
          onClick={handlePlayClick}
          disabled={!song.previewUrl}
          className={`p-2 rounded-full transition-colors ${
            isPlaying ? "text-green-500" : "text-gray-400"
          } hover:bg-gray-100 ${
            !song.previewUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPlaying ? <span>⏸️</span> : <span>▶️</span>}
        </button>
        <span className="text-sm text-gray-500">{song.duration}</span>
        <FavoriteToggle
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(song.id)}
        />
      </div>
    </div>
  );
};
