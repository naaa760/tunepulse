"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addFavorite, removeFavorite, checkFavorite } from "@/services/api";
import { Song } from "@/types";

interface SongListProps {
  songs: Song[];
  userId: string;
}

export default function SongList({ songs, userId }: SongListProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Check favorite status for each song
    const checkFavorites = async () => {
      const favoriteStatus: Record<string, boolean> = {};

      for (const song of songs) {
        if (!song.spotifyId) continue;

        try {
          const { isFavorite } = await checkFavorite(userId, song.spotifyId);
          favoriteStatus[song.spotifyId] = isFavorite;
        } catch (error) {
          console.error(`Failed to check favorite status for song:`, song);
          favoriteStatus[song.spotifyId] = false;
        }
      }

      setFavorites(favoriteStatus);
    };

    if (songs.length > 0) {
      checkFavorites();
    }
  }, [songs, userId]);

  useEffect(() => {
    console.log("Songs received:", songs);
  }, [songs]);

  const toggleFavorite = async (song: Song) => {
    if (!song.spotifyId) {
      console.error(
        "Cannot toggle favorite: No Spotify ID found for song",
        song
      );
      return;
    }

    const songIdToUse = song.spotifyId; // Always use spotifyId
    setIsLoading((prev) => ({ ...prev, [songIdToUse]: true }));

    try {
      if (favorites[songIdToUse]) {
        // Remove from favorites using spotifyId
        await removeFavorite(userId, songIdToUse);
      } else {
        // Add to favorites using spotifyId
        await addFavorite(userId, songIdToUse);
      }

      // Update local state using spotifyId as the key
      setFavorites((prev) => ({
        ...prev,
        [songIdToUse]: !prev[songIdToUse],
      }));
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [songIdToUse]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song, index) => (
        <div
          key={`song-${index}-${song.spotifyId || song.id || ""}`}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="relative h-48 w-full">
            {song.coverImage ? (
              <div className="relative h-48 w-full">
                <img
                  src={song.coverImage}
                  alt={`${song.title} cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-48 w-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">No Cover</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white truncate">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(song)}
                disabled={isLoading[song.spotifyId]}
                className={`${
                  favorites[song.spotifyId] ? "text-red-500" : "text-gray-400"
                } hover:text-red-500 transition-colors`}
              >
                <Heart
                  className={favorites[song.spotifyId] ? "fill-current" : ""}
                  size={20}
                />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mb-4">{song.album}</p>

            {song.previewUrl && (
              <audio controls className="w-full h-8" src={song.previewUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
