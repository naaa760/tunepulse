import { Injectable } from "@nestjs/common";
import { Song } from "../songs/song.entity";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifySearchResponse {
  tracks: {
    items: Array<{
      name: string;
      artists: Array<{ name: string }>;
      album: {
        images: Array<{ url: string }>;
      };
      duration_ms: number;
      preview_url: string | null;
    }>;
  };
}

@Injectable()
export class SpotifyService {
  private spotifyToken: string;
  private readonly clientId = process.env.SPOTIFY_CLIENT_ID;
  private readonly clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  constructor() {
    this.getAccessToken();
  }

  private async getAccessToken() {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
              "base64"
            ),
        },
        body: "grant_type=client_credentials",
      });

      if (!response.ok) {
        throw new Error("Failed to get Spotify token");
      }

      const data = (await response.json()) as SpotifyTokenResponse;
      this.spotifyToken = data.access_token;
    } catch (error: any) {
      console.error("Failed to get Spotify access token:", error);
      throw new Error(error.message || "Failed to get Spotify access token");
    }
  }

  async searchTracks(
    query: string
  ): Promise<Array<Omit<Song, "id" | "favorites">>> {
    try {
      // Check if token exists, if not get a new one
      if (!this.spotifyToken) {
        await this.getAccessToken();
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&market=US&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${this.spotifyToken}`,
          },
        }
      );

      // Handle token expiration
      if (response.status === 401) {
        await this.getAccessToken();
        return this.searchTracks(query);
      }

      if (!response.ok) {
        console.error(`Spotify API error: ${response.status}`);
        return []; // Return empty array instead of throwing
      }

      const data = (await response.json()) as SpotifySearchResponse;

      // Check if tracks exist
      if (
        !data.tracks ||
        !data.tracks.items ||
        data.tracks.items.length === 0
      ) {
        console.log("No tracks found for query:", query);
        return []; // Return empty array
      }

      return data.tracks.items.map((track) => ({
        title: track.name,
        artist: track.artists[0].name,
        albumArt: track.album.images[0]?.url || null,
        duration: this.formatDuration(track.duration_ms),
        createdAt: new Date(),
        previewUrl: track.preview_url || null,
      }));
    } catch (error: any) {
      console.error("Error searching Spotify:", error);
      return []; // Return empty array instead of throwing
    }
  }

  private formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}
