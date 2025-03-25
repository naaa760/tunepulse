import { Favorite } from "../types/Favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const DEFAULT_USER_ID = "default"; // For demo purposes

export const favoriteService = {
  // Toggle favorite status
  async toggleFavorite(songId: number): Promise<Favorite> {
    try {
      console.log("Attempting to toggle favorite for song:", songId); // Debug log

      const response = await fetch(`${API_URL}/favorites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          songId,
          userId: DEFAULT_USER_ID,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server response:", data); // Debug log
        throw new Error(data.message || "Failed to toggle favorite");
      }

      return data;
    } catch (error) {
      console.error("Toggle favorite error details:", error);
      throw new Error("Failed to update favorite. Please try again.");
    }
  },

  // Get all favorites
  async getFavorites(): Promise<Favorite[]> {
    const response = await fetch(
      `${API_URL}/favorites?userId=${DEFAULT_USER_ID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    return response.json();
  },
};
