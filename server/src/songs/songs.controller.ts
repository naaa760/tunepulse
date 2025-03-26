import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    // Make sure we have sample data
    const songs = await this.songsService.findAll();

    if (songs.length === 0) {
      // Add some sample songs if none exist
      await this.songsService.createSampleSongs();
      return this.songsService.findAll();
    }

    return songs;
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Song[]> {
    if (!query) {
      throw new HttpException(
        'Search query is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.songsService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    return this.songsService.findOne(id);
  }
}
