import { Favorite } from "../types/Favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const DEFAULT_USER_ID = "default"; // For demo purposes

export const favoriteService = {
  // Toggle favorite status
  async toggleFavorite(songId: number): Promise<Favorite> {
    const response = await fetch(`${API_URL}/favorites/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songId,
        userId: DEFAULT_USER_ID,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
    return response.json();
  },

  // Get all favorites
  async getFavorites(): Promise<Favorite[]> {
    const response = await fetch(
      `${API_URL}/favorites?userId=${DEFAULT_USER_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    return response.json();
  },
};
