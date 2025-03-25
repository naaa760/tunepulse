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
      const uniqueSongs = songsData.filter(
        (song, index, self) => index === self.findIndex((s) => s.id === song.id)
      );
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
      setSongs(results);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to search songs");
    } finally {
      setLoading(false);
    }
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
    <div className="max-w-4xl mx-auto p-4">
      <SongSearch onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-600">Loading songs...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md my-4">
          {error}
        </div>
      )}

      {!loading && !error && songs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No songs found. Try searching for something else.
        </div>
      )}

      {!loading && !error && songs.length > 0 && (
        <div className="space-y-4 mt-6">
          {songs.map((song) => (
            <SongItem
              key={`${song.id}-${song.title}`}
              song={song}
              isFavorite={favorites.some((fav) => fav.songId === song.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
