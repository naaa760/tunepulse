import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
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
  async search(@Query("q") query: string): Promise<Song[]> {
    this.logger.log(`Received search request for: ${query}`);
    const results = await this.songsService.search(query);
    this.logger.log(`Returning ${results.length} search results`);
    return results;
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
