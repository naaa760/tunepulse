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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSongs();
    loadFavorites();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await songService.getAllSongs();
      setSongs(data);
    } catch (err) {
      setError("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const data = await favoriteService.getFavorites();
      setFavorites(data);
    } catch (err) {
      setError("Failed to load favorites");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await songService.searchSongs(query);
      setSongs(data);
    } catch (err) {
      setError("Failed to search songs");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (songId: number) => {
    try {
      await favoriteService.toggleFavorite(songId);
      await loadFavorites(); // Reload favorites after toggle
    } catch (err) {
      setError("Failed to toggle favorite");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SongSearch onSearch={handleSearch} />
      <div className="space-y-2">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isFavorite={favorites.some((fav) => fav.songId === song.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
