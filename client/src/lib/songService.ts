import { Song } from "../types/Song";

// Use the API proxy
const API_BASE = "/api";

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response = await fetch(`${API_BASE}/songs`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
};

export const searchSongs = async (query: string): Promise<Song[]> => {
  try {
    const response = await fetch(
      `${API_BASE}/songs/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to search songs for "${query}":`, error);
    return [];
  }
};

export const getSongById = async (id: number): Promise<Song | null> => {
  try {
    const response = await fetch(`${API_BASE}/songs/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch song with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching song ${id}:`, error);
    return null;
  }
};
