import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { SpotifyTrackDto } from './dto/spotify-track.dto';

// Internal interfaces (not exported)
interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  name: string;
  images: Array<{ url: string }>;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  preview_url: string | null;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

interface SpotifyPlaylistResponse {
  items: Array<{
    track: SpotifyTrack;
  }>;
}

interface SpotifyNewReleasesResponse {
  albums: {
    items: Array<{
      id: string;
      name: string;
      artists: SpotifyArtist[];
      images: Array<{ url: string }>;
    }>;
  };
}

@Injectable()
export class SpotifyService {
  private accessToken: string;
  private tokenExpiresAt: Date;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken(): Promise<string> {
    // Check if token exists and is not expired
    if (this.accessToken && this.tokenExpiresAt > new Date()) {
      return this.accessToken;
    }

    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    );

    if (!clientId || !clientSecret) {
      throw new HttpException(
        'Spotify credentials not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: `Basic ${authString}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      this.accessToken = response.data.access_token;
      // Set expiration time (usually 3600 seconds = 1 hour)
      this.tokenExpiresAt = new Date(
        Date.now() + response.data.expires_in * 1000,
      );

      return this.accessToken;
    } catch (error) {
      throw new HttpException(
        'Failed to get Spotify access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchSongs(query: string): Promise<SpotifyTrackDto[]> {
    try {
      const token = await this.getAccessToken();
      const { data } = await lastValueFrom(
        this.httpService.get<SpotifySearchResponse>(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query,
          )}&type=track&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      if (!data.tracks || !data.tracks.items) {
        return [];
      }

      return data.tracks.items.map((track) => this.mapTrackToDto(track));
    } catch (error) {
      throw new HttpException(
        'Failed to search songs on Spotify',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTopTracks(): Promise<SpotifyTrackDto[]> {
    try {
      const token = await this.getAccessToken();

      // Use Spotify's charts API instead of a specific playlist
      const { data } = await lastValueFrom(
        this.httpService.get<SpotifyNewReleasesResponse>(
          'https://api.spotify.com/v1/browse/new-releases?limit=20',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );

      if (!data || !data.albums || !data.albums.items) {
        console.log('No data returned from Spotify API');
        return [];
      }

      // Map album items to track format
      return data.albums.items.map((album) => ({
        spotifyId: album.id,
        title: album.name,
        artist: album.artists.map((artist) => artist.name).join(', '),
        album: album.name,
        coverImage: album.images[0]?.url || null,
        previewUrl: null, // New releases endpoint doesn't provide preview URLs
      }));
    } catch (error) {
      console.error('Error fetching top tracks from Spotify:', error);
      // Return empty array instead of throwing error to prevent 500
      return [];
    }
  }

  private mapTrackToDto(track: SpotifyTrack): SpotifyTrackDto {
    return {
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      album: track.album.name,
      coverImage: track.album.images[0]?.url || null,
      previewUrl: track.preview_url,
    };
  }
}
