import { Module } from "@nestjs/common";
import { SongsController } from "./songs.controller";
import { SongsService } from "./songs.service";
import { PrismaService } from "../prisma/prisma.service";
import { SpotifyModule } from "../spotify/spotify.module";

@Module({
  imports: [SpotifyModule],
  controllers: [SongsController],
  providers: [SongsService, PrismaService],
  exports: [SongsService],
})
export class SongsModule {}
