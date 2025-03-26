"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { fetchTopTracks, searchSongs, getUserFavorites } from "@/services/api";
import SongList from "@/components/SongList";
import SearchBar from "@/components/SearchBar";
import { Song } from "@/types";

// Define types
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string | null;
  duration: number;
  imageUrl: string | null;
  audioUrl: string | null;
}

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Default user ID for demo purposes
  const userId = "user-1";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    const loadTopTracks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTopTracks();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch top tracks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopTracks();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // If search is cleared, load top tracks again
      const data = await fetchTopTracks();
      setSongs(data);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchSongs(query);
      setSongs(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites(userId);
        setFavorites(data.map((fav) => fav.songId));
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const toggleFavorite = async (songId: number) => {
    try {
      if (favorites.includes(songId)) {
        // Remove from favorites
        await fetch(`${apiUrl}/favorites/${userId}/${songId}`, {
          method: "DELETE",
        });
        setFavorites(favorites.filter((id) => id !== songId));
      } else {
        // Add to favorites
        await fetch(`${apiUrl}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, songId }),
        });
        setFavorites([...favorites, songId]);
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Music Dashboard</h1>
          <Link href="/favorites">
            <Button variant="ghost" className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Button>
          </Link>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top Tracks"}
          </h2>

          {isLoading || isSearching ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : songs.length > 0 ? (
            <SongList songs={songs} userId={userId} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No songs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
