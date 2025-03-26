import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
