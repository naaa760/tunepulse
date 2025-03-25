import { Song } from "../types/Song";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const songService = {
  // Get all songs
  async getAllSongs(): Promise<Song[]> {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }
    return response.json();
  },

  // Search songs
  async searchSongs(query: string): Promise<Song[]> {
    const response = await fetch(
      `${API_URL}/songs/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search songs");
    }
    return response.json();
  },
};
