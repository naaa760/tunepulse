import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SpotifyTrackDto } from '../spotify/dto/spotify-track.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get('search')
  search(@Query('query') query: string): Promise<SpotifyTrackDto[]> {
    return this.songsService.searchSongs(query);
  }

  @Get('top-tracks')
  async getTopTracks() {
    try {
      console.log('Getting top tracks from Spotify...');
      const result = await this.songsService.getTopTracks();
      console.log(`Found ${result.length} top tracks`);
      return result;
    } catch (error) {
      console.error('Error getting top tracks:', error);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }
}
