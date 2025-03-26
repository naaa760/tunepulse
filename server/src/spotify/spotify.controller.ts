import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyTrackDto } from './dto/spotify-track.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('search')
  async searchSongs(@Query('query') query: string): Promise<SpotifyTrackDto[]> {
    return this.spotifyService.searchSongs(query);
  }

  @Get('top-tracks')
  async getTopTracks(): Promise<SpotifyTrackDto[]> {
    return this.spotifyService.getTopTracks();
  }
}
