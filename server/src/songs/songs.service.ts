import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SpotifyService } from "../spotify/spotify.service";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "./song.entity";

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,
    private spotifyService: SpotifyService
  ) {}

  async findAll(): Promise<Song[]> {
    try {
      const songs = await this.prisma.song.findMany();
      return songs as Song[];
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw new Error("Failed to fetch songs");
    }
  }

  async search(query: string): Promise<Song[]> {
    try {
      // Search from Spotify
      const spotifyResults = await this.spotifyService.searchTracks(query);

      if (spotifyResults.length === 0) {
        console.log("No results found for query:", query);
        return []; // Return empty array if no results
      }

      // Save results to database
      const savedSongs = await Promise.all(
        spotifyResults.map((songData) =>
          this.prisma.song.upsert({
            where: {
              title_artist: {
                title: songData.title,
                artist: songData.artist,
              },
            },
            update: {},
            create: {
              title: songData.title,
              artist: songData.artist,
              albumArt: songData.albumArt,
              duration: songData.duration,
              createdAt: songData.createdAt,
              previewUrl: songData.previewUrl,
            },
          })
        )
      );

      return savedSongs as Song[];
    } catch (error) {
      console.error("Error searching songs:", error);
      return []; // Return empty array instead of throwing
    }
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    try {
      const song = (await this.prisma.song.create({
        data: createSongDto,
      })) as Song;
      return song;
    } catch (error: any) {
      console.error("Error creating song:", error);
      throw new Error("Failed to create song");
    }
  }
}
