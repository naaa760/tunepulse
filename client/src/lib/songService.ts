import { Song } from "../types/Song";

export class SongService {
  private baseUrl = "http://localhost:4000/songs"; // Make sure this matches your server port

  async getAllSongs(): Promise<Song[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.status}`);
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching songs:", error);
      throw new Error(error.message || "Failed to fetch songs");
    }
  }

  async searchSongs(query: string): Promise<Song[]> {
    try {
      if (!query?.trim()) {
        return this.getAllSongs();
      }

      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(query.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.status}`);
      }

      return data;
    } catch (error: any) {
      console.error("Search error:", error);
      throw new Error(error.message || "Failed to search songs");
    }
  }
}

export const songService = new SongService();
