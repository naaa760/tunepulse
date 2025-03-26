import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { Song } from "./song.entity";
import { Logger } from "@nestjs/common";

@Controller("songs")
export class SongsController {
  private readonly logger = new Logger(SongsController.name);

  constructor(private songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get("search")
  async searchSongs(@Query("query") query: string) {
    this.logger.log(`Searching for songs with query: ${query}`);
    try {
      const songs = await this.songsService.searchSongs(query);
      this.logger.log(`Found ${songs.length} songs for query: ${query}`);
      return songs;
    } catch (error) {
      this.logger.error(`Error searching songs: ${error.message}`, error.stack);
      throw new InternalServerErrorException("Failed to search songs");
    }
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Song> {
    try {
      return await this.songsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
