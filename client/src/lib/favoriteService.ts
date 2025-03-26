import { Favorite } from "@/types/Favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function getFavorites(): Promise<Favorite[]> {
  const response = await fetch(`${API_URL}/favorites`);

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return response.json();
}

export async function toggleFavorite(songId: string): Promise<Favorite> {
  const response = await fetch(`${API_URL}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle favorite");
  }

  return response.json();
}

export async function isFavorite(songId: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/favorites/check/${songId}`);

  if (!response.ok) {
    throw new Error("Failed to check favorite status");
  }

  const data = await response.json();
  return data.isFavorite;
}
