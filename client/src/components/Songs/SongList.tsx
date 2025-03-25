"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Song";
import { Favorite } from "@/types/Favorite";
import { songService } from "@/lib/songService";
import { favoriteService } from "@/lib/favoriteService";
import { SongSearch } from "./SongSearch";
import { SongItem } from "./SongItem";

export const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [songsData, favoritesData] = await Promise.all([
        songService.getAllSongs(),
        favoriteService.getFavorites(),
      ]);

      // Filter out duplicate songs by title and artist
      const uniqueSongs = filterDuplicateSongs(songsData);
      setSongs(uniqueSongs);
      setFavorites(favoritesData);
    } catch (err) {
      console.error("Error loading initial data:", err);
      setError("Failed to load songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await songService.searchSongs(query);

      // Filter out duplicate songs by title and artist
      const uniqueResults = filterDuplicateSongs(results);
      setSongs(uniqueResults);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to search songs");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to filter out duplicate songs
  const filterDuplicateSongs = (songList: Song[]): Song[] => {
    const uniqueSongs = new Map<string, Song>();

    songList.forEach((song) => {
      const key = `${song.title}-${song.artist}`;
      if (!uniqueSongs.has(key)) {
        uniqueSongs.set(key, song);
      }
    });

    return Array.from(uniqueSongs.values());
  };

  const handleToggleFavorite = async (songId: number) => {
    try {
      await favoriteService.toggleFavorite(songId);
      const updatedFavorites = await favoriteService.getFavorites();
      setFavorites(updatedFavorites);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError("Failed to update favorite. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen p-6 rounded-xl"
      style={{
        backgroundImage: "url('/sg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm rounded-xl" />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-md">
          <SongSearch onSearch={handleSearch} />

          {loading && (
            <div className="flex justify-center py-8">
              <div className="text-white">Loading songs...</div>
            </div>
          )}

          {error && (
            <div className="bg-red-500 bg-opacity-75 text-white p-4 rounded-md my-4">
              {error}
            </div>
          )}

          {!loading && !error && songs.length === 0 && (
            <div className="text-center py-8 text-white">
              No songs found. Try searching for something else.
            </div>
          )}

          {!loading && !error && songs.length > 0 && (
            <div className="space-y-4">
              {songs.map((song) => (
                <div
                  key={`${song.id}-${song.artist}-${song.title}`}
                  className="transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
                >
                  <SongItem
                    song={song}
                    isFavorite={favorites.some((fav) => fav.songId === song.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
