import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SpotifyModule } from '../spotify/spotify.module';

@Module({
  imports: [PrismaModule, SpotifyModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
