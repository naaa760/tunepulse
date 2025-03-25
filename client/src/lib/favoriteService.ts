import { Favorite } from "../types/Favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const DEFAULT_USER_ID = "default"; // For demo purposes

// Simple function to check if the server is running
async function checkServerConnection() {
  try {
    const response = await fetch(`${API_URL}/health-check`, { method: "GET" });
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const favoriteService = {
  // Toggle favorite status
  async toggleFavorite(songId: number): Promise<Favorite> {
    try {
      // First check if server is reachable
      console.log("Checking server connection...");
      const serverStatus = await checkServerConnection();
      console.log("Server status:", serverStatus);

      if (!serverStatus.ok && "error" in serverStatus) {
        console.error("Server connection failed:", serverStatus.error);
        throw new Error(`Cannot connect to server: ${serverStatus.error}`);
      }

      // Make the request
      const url = `${API_URL}/favorites/toggle`;

      // Ensure songId is a number
      const numericSongId = Number(songId);

      if (isNaN(numericSongId)) {
        throw new Error(`Invalid song ID: ${songId}`);
      }

      console.log(`Making request to: ${url} with songId: ${numericSongId}`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors", // Explicitly set CORS mode
        credentials: "include", // Include credentials if needed
        body: JSON.stringify({
          songId: numericSongId,
          userId: DEFAULT_USER_ID,
        }),
      });

      // Get the response text
      const responseText = await response.text();

      // Try to parse JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (e) {
        console.error("Failed to parse response:", responseText);
      }

      // Handle error responses
      if (!response.ok) {
        const errorMessage =
          data?.message || `Server error: ${response.status}`;
        console.error("Server returned error:", {
          status: response.status,
          message: errorMessage,
          data,
        });
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      // Just rethrow the original error with its message intact
      throw error;
    }
  },

  // Get all favorites - simplified version
  async getFavorites(): Promise<Favorite[]> {
    try {
      const response = await fetch(
        `${API_URL}/favorites?userId=${DEFAULT_USER_ID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          mode: "cors", // Explicitly set CORS mode
          credentials: "include", // Include credentials if needed
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch favorites. Status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw new Error("Failed to fetch favorites");
    }
  },
};
