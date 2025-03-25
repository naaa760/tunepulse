"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/Song";
import { Favorite } from "@/types/Favorite";
import { songService } from "@/lib/songService";
import { favoriteService } from "@/lib/favoriteService";
import { SongItem } from "@/components/Songs/SongItem";

export default function FavoritesPage() {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavoriteSongs();
  }, []);

  const loadFavoriteSongs = async () => {
    try {
      const favorites = await favoriteService.getFavorites();
      const songs = await songService.getAllSongs();
      const favSongs = songs.filter((song) =>
        favorites.some((fav) => fav.songId === song.id)
      );
      setFavoriteSongs(favSongs);
    } catch (err) {
      setError("Failed to load favorite songs");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (songId: number) => {
    try {
      await favoriteService.toggleFavorite(songId);
      await loadFavoriteSongs();
    } catch (err) {
      setError("Failed to toggle favorite");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Favorite Songs
        </h1>
        <div className="max-w-4xl mx-auto">
          {favoriteSongs.length === 0 ? (
            <p className="text-gray-500 text-center">No favorite songs yet</p>
          ) : (
            <div className="space-y-2">
              {favoriteSongs.map((song) => (
                <SongItem
                  key={song.id}
                  song={song}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
