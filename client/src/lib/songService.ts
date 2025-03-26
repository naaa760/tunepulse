import { Song } from "@/types/Song";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function getSongs(query?: string): Promise<Song[]> {
  const url = query
    ? `${API_URL}/songs/search?query=${encodeURIComponent(query)}`
    : `${API_URL}/songs`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}

export async function getSongById(id: string): Promise<Song> {
  const response = await fetch(`${API_URL}/songs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch song");
  }

  return response.json();
}
