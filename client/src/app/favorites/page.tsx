"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserFavorites } from "@/services/api";
import SongList from "@/components/SongList";
import { Song } from "@/types";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = "user-1"; // Default user ID for demo

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites(userId);
        setFavorites(data.map((fav: any) => fav.song));
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading favorites...</p>
        </div>
      ) : favorites.length > 0 ? (
        <SongList songs={favorites} userId={userId} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400">No favorite songs yet</p>
        </div>
      )}
    </div>
  );
}
