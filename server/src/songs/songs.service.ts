import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SpotifyService } from "../spotify/spotify.service";
import { Song } from "./song.entity";

@Injectable()
export class SongsService {
  private readonly logger = new Logger(SongsService.name);

  constructor(
    private prisma: PrismaService,
    private spotifyService: SpotifyService
  ) {}

  async findAll(): Promise<Song[]> {
    try {
      return await this.prisma.song.findMany({
        orderBy: { title: "asc" },
      });
    } catch (error) {
      this.logger.error("Error fetching all songs", error);
      return [];
    }
  }

  async search(query: string): Promise<Song[]> {
    if (!query || query.trim() === "") {
      return this.findAll();
    }

    try {
      // First check local database
      const localResults = await this.prisma.song.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { artist: { contains: query, mode: "insensitive" } },
            { album: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { popularity: "desc" },
      });

      // If we have enough results, return them
      if (localResults.length >= 10) {
        return localResults;
      }

      // Otherwise, fetch from Spotify and save to database
      const spotifyResults = await this.spotifyService.searchTracks(query);
      const newSongs: Song[] = [];

      for (const track of spotifyResults) {
        // Check if song already exists in database
        const existingSong = await this.prisma.song.findFirst({
          where: { spotifyId: track.id },
        });

        if (!existingSong) {
          // Create new song in database
          const newSong = await this.prisma.song.create({
            data: {
              spotifyId: track.id,
              title: track.name,
              artist: track.artists.map((a) => a.name).join(", "),
              album: track.album.name,
              releaseYear: new Date(track.album.release_date).getFullYear(),
              duration: track.duration_ms,
              imageUrl: track.album.images[0]?.url,
              previewUrl: track.preview_url,
              popularity: track.popularity,
              externalUrl: track.external_urls.spotify,
            },
          });
          newSongs.push(newSong);
        } else {
          newSongs.push(existingSong);
        }
      }

      // Combine results, remove duplicates, and sort by popularity
      const combinedResults = [...localResults];

      for (const song of newSongs) {
        if (!combinedResults.some((s) => s.id === song.id)) {
          combinedResults.push(song);
        }
      }

      return combinedResults.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );
    } catch (error) {
      this.logger.error(`Error searching songs for query: ${query}`, error);
      return [];
    }
  }

  async findOne(id: number): Promise<Song> {
    try {
      const song = await this.prisma.song.findUnique({
        where: { id },
      });

      if (!song) {
        throw new NotFoundException(`Song with ID ${id} not found`);
      }

      return song;
    } catch (error) {
      this.logger.error(`Error fetching song with id ${id}`, error);
      throw error;
    }
  }

  async searchSongs(query: string): Promise<Song[]> {
    this.logger.log(`Searching for songs with query: ${query}`);

    try {
      // First, try to find songs in the database
      const dbSongs = await this.prisma.song.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { artist: { contains: query, mode: "insensitive" } },
            { album: { contains: query, mode: "insensitive" } },
          ],
        },
      });

      // If we found songs in the database, return them
      if (dbSongs.length > 0) {
        this.logger.log(
          `Found ${dbSongs.length} songs in database for query: ${query}`
        );
        return dbSongs;
      }

      // Otherwise, search Spotify
      this.logger.log(
        `No songs found in database, searching Spotify for: ${query}`
      );
      const spotifyTracks = await this.spotifyService.searchTracks(query);

      // Map Spotify tracks to our Song entity format
      const songs = spotifyTracks.map((track) => ({
        id: null, // This will be assigned by the database
        title: track.name,
        artist: track.artists?.[0]?.name || "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        releaseYear: track.album?.release_date
          ? new Date(track.album.release_date).getFullYear()
          : null,
        duration: track.duration_ms,
        imageUrl: track.album?.images?.[0]?.url || null,
        popularity: track.popularity || 0,
        spotifyId: track.id,
      }));

      this.logger.log(
        `Found ${songs.length} songs on Spotify for query: ${query}`
      );
      return songs;
    } catch (error) {
      this.logger.error(`Error searching songs: ${error.message}`, error.stack);
      return [];
    }
  }
}
