import { Song } from "@/types/Song";
import { FavoriteToggle } from "../Favorites/FavoriteToggle";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (song.previewUrl && !audioRef.current) {
      audioRef.current = new Audio(song.previewUrl);

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [song.previewUrl]);

  const handlePlayClick = async () => {
    if (!song.previewUrl || !audioRef.current) {
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        document.querySelectorAll("audio").forEach((audio) => audio.pause());
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 mr-4">
          {song.albumArt ? (
            <Image
              src={song.albumArt}
              alt={`${song.title} by ${song.artist}`}
              width={60}
              height={60}
              className="w-16 h-16 rounded-md object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {song.title}
          </h3>
          <p className="text-sm text-gray-500">{song.artist}</p>
          <p className="text-xs text-gray-400 mt-1">{song.duration}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePlayClick}
            disabled={!song.previewUrl}
            className={`p-2 rounded-full transition-colors ${
              isPlaying
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            } ${!song.previewUrl ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <FavoriteToggle
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(song.id)}
          />
        </div>
      </div>
    </div>
  );
};
