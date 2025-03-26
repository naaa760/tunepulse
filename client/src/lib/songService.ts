import { Song } from "../types/Song";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response = await fetch(`${API_URL}/songs`);

    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const searchSongs = async (query: string): Promise<Song[]> => {
  try {
    const response = await fetch(
      `${API_URL}/songs/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to search songs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching songs:", error);
    return [];
  }
};

export const getSongById = async (id: number): Promise<Song | null> => {
  try {
    const response = await fetch(`${API_URL}/songs/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch song with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching song ${id}:`, error);
    return null;
  }
};
