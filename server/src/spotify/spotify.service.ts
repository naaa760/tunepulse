import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SpotifyService implements OnModuleInit {
  private accessToken: string;
  private tokenExpiry: Date;
  private readonly logger = new Logger(SpotifyService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.getAccessToken();
  }

  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }

    const clientId = this.configService.get<string>("SPOTIFY_CLIENT_ID");
    const clientSecret = this.configService.get<string>(
      "SPOTIFY_CLIENT_SECRET"
    );

    if (!clientId || !clientSecret) {
      this.logger.error("Spotify credentials not configured");
      throw new Error("Spotify credentials not configured");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      // Set expiry time (usually 3600 seconds)
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
      this.logger.log("Spotify access token obtained successfully");

      return this.accessToken;
    } catch (error) {
      this.logger.error("Failed to get Spotify access token", error);
      throw error;
    }
  }

  async searchTracks(query: string, limit = 20): Promise<any[]> {
    try {
      this.logger.log(`Searching Spotify for: ${query}`);
      const token = await this.getAccessToken();

      // Add market parameter to get more relevant results
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=${limit}&market=US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.logger.log(
        `Found ${response.data.tracks.items.length} tracks on Spotify`
      );
      return response.data.tracks.items;
    } catch (error) {
      this.logger.error(
        `Failed to search Spotify tracks for query: ${query}`,
        error
      );
      return [];
    }
  }

  async getTrack(spotifyId: string): Promise<any> {
    const token = await this.getAccessToken();

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${spotifyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get Spotify track ${spotifyId}`, error);
      return null;
    }
  }
}
