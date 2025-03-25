import { Song } from "../types/Song";

export class SongService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async getAllSongs(): Promise<Song[]> {
    try {
      const response = await fetch(`${this.baseUrl}/songs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch songs: ${response.statusText}`);
      }
      return response.json();
    } catch (error: unknown) {
      console.error("Error fetching songs:", error);
      throw new Error("Failed to load songs. Please try again.");
    }
  }

  async searchSongs(query: string): Promise<Song[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/songs/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      return response.json();
    } catch (error: unknown) {
      console.error("Error searching songs:", error);
      throw new Error("Failed to search songs. Please try again.");
    }
  }
}

export const songService = new SongService();
