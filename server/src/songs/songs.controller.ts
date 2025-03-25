import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "./song.entity";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    try {
      return await this.songsService.findAll();
    } catch (error) {
      console.error("Error in findAll:", error);
      throw new HttpException(
        "Failed to fetch songs",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("search")
  async search(@Query("q") query: string): Promise<Song[]> {
    try {
      if (!query || query.trim() === "") {
        return this.songsService.findAll();
      }
      console.log("Searching for:", query);
      const results = await this.songsService.search(query);
      return results;
    } catch (error) {
      console.error("Search error:", error);
      // Return empty array instead of throwing exception
      return [];
    }
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }
}
