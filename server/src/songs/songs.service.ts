import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Song } from './song.entity';
import axios from 'axios';

// Define TypeScript interfaces for Spotify response structure
interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyAlbum {
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  preview_url: string | null;
}

interface SpotifyTracksResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

interface SpotifyTokenResponse {
  access_token: string;
}

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  // Get all songs
  async findAll(): Promise<Song[]> {
    return (await this.prisma.song.findMany({
      orderBy: { createdAt: 'desc' },
    })) as unknown as Song[];
  }

  // Get a single song by ID
  async findOne(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    return song as unknown as Song;
  }

  // Search for songs
  async search(query: string): Promise<Song[]> {
    // First check our database for matching songs
    const localSongs = await this.prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    // If we have enough local results, return them
    if (localSongs.length >= 10) {
      return localSongs as unknown as Song[];
    }

    // Otherwise, call Spotify API to get more songs
    try {
      const token = await this.getSpotifyToken();
      const response = await axios.get<SpotifyTracksResponse>(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query,
        )}&type=track&limit=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const spotifyTracks = response.data.tracks.items;
      const newSongs: Song[] = [];

      // Process Spotify tracks and save new ones to our database
      for (const track of spotifyTracks) {
        const existingSong = await this.prisma.song.findUnique({
          where: { spotifyId: track.id },
        });

        if (!existingSong) {
          const newSong = await this.prisma.song.create({
            data: {
              spotifyId: track.id,
              title: track.name,
              artist: track.artists.map((a) => a.name).join(', '),
              albumArt: track.album.images[0]?.url || null,
              previewUrl: track.preview_url,
            },
          });
          newSongs.push(newSong as unknown as Song);
        }
      }

      // Return a combination of local and new songs
      return [...localSongs, ...newSongs] as Song[];
    } catch (error) {
      console.error('Error searching Spotify:', error);
      // If Spotify API fails, return what we have from the local database
      return localSongs as unknown as Song[];
    }
  }

  // Helper method to get a Spotify access token
  private async getSpotifyToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new HttpException(
        'Spotify credentials not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const response = await axios.post<SpotifyTokenResponse>(
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
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting Spotify token:', error);
      throw new HttpException(
        'Failed to authenticate with Spotify',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createSampleSongs(): Promise<void> {
    // Check if we already have songs
    const existingSongs = await this.prisma.song.count();

    if (existingSongs > 0) {
      return; // Don't add samples if we already have songs
    }

    // Sample songs
    const sampleSongs = [
      {
        spotifyId: 'sample1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        albumArt:
          'https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da',
        previewUrl: null,
      },
      {
        spotifyId: 'sample2',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        albumArt:
          'https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97',
        previewUrl: null,
      },
      {
        spotifyId: 'sample3',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        albumArt:
          'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
        previewUrl: null,
      },
    ];

    // Insert samples
    for (const song of sampleSongs) {
      await this.prisma.song.create({ data: song });
    }
  }
}
