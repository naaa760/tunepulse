import { FavoriteResponse } from "../types/Favorite";
import { Song } from "../types/Song";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const getFavorites = async (): Promise<Song[]> => {
  try {
    const response = await fetch(`${API_URL}/favorites`, {
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const addFavorite = async (
  songId: number
): Promise<FavoriteResponse> => {
  try {
    const response = await fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
      body: JSON.stringify({ songId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding favorite:", error);
    return { success: false, message: "Failed to add favorite" };
  }
};

export const removeFavorite = async (
  songId: number
): Promise<FavoriteResponse> => {
  try {
    const response = await fetch(`${API_URL}/favorites/${songId}`, {
      method: "DELETE",
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to remove favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing favorite:", error);
    return { success: false, message: "Failed to remove favorite" };
  }
};

export const checkIsFavorite = async (songId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/favorites/check/${songId}`, {
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};
