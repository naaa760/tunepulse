import { Song } from "../types/Song";

export class SongService {
  private baseUrl = "http://localhost:4000";

  async getAllSongs(): Promise<Song[]> {
    try {
      const response = await fetch(`${this.baseUrl}/songs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch songs: ${response.statusText}`);
      }
      return response.json();
    } catch (error: unknown) {
      console.error("Error fetching songs:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(errorMessage);
    }
  }

  async searchSongs(query: string): Promise<Song[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/songs/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      return response.json();
    } catch (error: unknown) {
      console.error("Error searching songs:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(errorMessage);
    }
  }
}

export const songService = new SongService();
