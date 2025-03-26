"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { fetchTopTracks, searchSongs } from "@/services/api";
import SongList from "@/components/SongList";
import SearchBar from "@/components/SearchBar";
import { Song } from "@/types";

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const userId = "user-1";

  useEffect(() => {
    const loadTopTracks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTopTracks();
        setSongs(data);
      } catch (err) {
        console.error("Failed to fetch top tracks:", err);
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
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
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
