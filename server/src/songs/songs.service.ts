import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SpotifyService } from '../spotify/spotify.service';
import { SpotifyTrackDto } from '../spotify/dto/spotify-track.dto';

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,
    private spotifyService: SpotifyService,
  ) {}

  async findAll() {
    return this.prisma.song.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.song.findUnique({
      where: { id },
    });
  }

  async searchSongs(query: string): Promise<SpotifyTrackDto[]> {
    const spotifyResults = await this.spotifyService.searchSongs(query);

    // Store songs in our database if they don't exist
    for (const song of spotifyResults) {
      await this.prisma.song.upsert({
        where: { spotifyId: song.spotifyId },
        update: {},
        create: {
          spotifyId: song.spotifyId,
          title: song.title,
          artist: song.artist,
          album: song.album,
          coverImage: song.coverImage,
          previewUrl: song.previewUrl,
        },
      });
    }

    return spotifyResults;
  }

  async getTopTracks(): Promise<SpotifyTrackDto[]> {
    try {
      const spotifyResults = await this.spotifyService.getTopTracks();

      // Store songs in our database if they don't exist
      for (const song of spotifyResults) {
        try {
          await this.prisma.song.upsert({
            where: { spotifyId: song.spotifyId },
            update: {},
            create: {
              spotifyId: song.spotifyId,
              title: song.title,
              artist: song.artist,
              album: song.album,
              coverImage: song.coverImage,
              previewUrl: song.previewUrl,
            },
          });
        } catch (dbError) {
          console.error('Error storing song in database:', dbError);
          // Continue with next song
        }
      }

      return spotifyResults;
    } catch (error) {
      console.error('Error in getTopTracks:', error);
      return [];
    }
  }
}
