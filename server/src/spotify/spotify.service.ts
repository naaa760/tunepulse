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
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (
      this.accessToken &&
      this.tokenExpiresAt &&
      this.tokenExpiresAt > new Date()
    ) {
      return this.accessToken;
    }

    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    );

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not configured');
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`,
              ).toString('base64')}`,
            },
          },
        ),
      );

      if (!response.data.access_token) {
        throw new Error('No access token received from Spotify');
      }

      const token = response.data.access_token as string;
      this.accessToken = token;
      this.tokenExpiresAt = new Date(
        Date.now() + response.data.expires_in * 1000,
      );

      return token;
    } catch (error) {
      console.error('Failed to get Spotify access token:', error);
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
      // Try to get real data from Spotify
      const token = await this.getAccessToken();
      console.log('Got Spotify access token, fetching top tracks...');

      try {
        // Try the search endpoint with a popular term
        const { data } = await lastValueFrom(
          this.httpService.get(
            'https://api.spotify.com/v1/search?q=pop&type=track&limit=20',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ),
        );

        if (
          data &&
          data.tracks &&
          data.tracks.items &&
          data.tracks.items.length > 0
        ) {
          console.log('Successfully fetched tracks from Spotify search');
          return data.tracks.items.map((track: any) => ({
            spotifyId: track.id,
            title: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: track.album.name,
            coverImage: track.album.images[0]?.url || null,
            previewUrl: track.preview_url,
          }));
        }
      } catch (spotifyError) {
        console.error('Error with Spotify API, using mock data:', spotifyError);
      }

      // If Spotify API fails, return mock data
      console.log('Using mock data as fallback');
      return [
        {
          spotifyId: '1',
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          album: '÷ (Divide)',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
          previewUrl:
            'https://p.scdn.co/mp3-preview/7339b500316d7c25e87b31e15efe5c8a3e27c4c7',
        },
        {
          spotifyId: '2',
          title: 'Blinding Lights',
          artist: 'The Weeknd',
          album: 'After Hours',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
          previewUrl:
            'https://p.scdn.co/mp3-preview/8b6e2f77a4c790dff5a9c2b5f5dd33c7c79d4d45',
        },
        {
          spotifyId: '3',
          title: 'Dance Monkey',
          artist: 'Tones and I',
          album: 'The Kids Are Coming',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b273c6f7af36eccd256b4d13cdee',
          previewUrl:
            'https://p.scdn.co/mp3-preview/5f3bd1d8b9fa73879cde2e2d68e9a09a9650d54e',
        },
        {
          spotifyId: '4',
          title: 'Someone You Loved',
          artist: 'Lewis Capaldi',
          album: 'Divinely Uninspired To A Hellish Extent',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2',
          previewUrl:
            'https://p.scdn.co/mp3-preview/ddb6a0209eb7b570e1d4a0c66a72a63d2c44f9e5',
        },
        {
          spotifyId: '5',
          title: 'Bad Guy',
          artist: 'Billie Eilish',
          album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b273d55684e9a9cf819c701d8587',
          previewUrl:
            'https://p.scdn.co/mp3-preview/7e8f1f26e2f440b781c7cad3d69a3b5827d93fc9',
        },
      ];
    } catch (error) {
      console.error('Error in getTopTracks:', error);
      // Return mock data as a last resort
      return [
        {
          spotifyId: '1',
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          album: '÷ (Divide)',
          coverImage:
            'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
          previewUrl:
            'https://p.scdn.co/mp3-preview/7339b500316d7c25e87b31e15efe5c8a3e27c4c7',
        },
        // Add more mock tracks here
      ];
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
