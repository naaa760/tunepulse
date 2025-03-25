import { Favorite } from "../types/Favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const favoriteService = {
  // Toggle favorite status
  async toggleFavorite(songId: number): Promise<Favorite> {
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
  },

  // Get all favorites
  async getFavorites(): Promise<Favorite[]> {
    const response = await fetch(`${API_URL}/favorites`);
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    return response.json();
  },
};
