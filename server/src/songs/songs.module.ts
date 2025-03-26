import { Module } from "@nestjs/common";
import { SongsController } from "./songs.controller";
import { SongsService } from "./songs.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SpotifyModule } from "../spotify/spotify.module";

@Module({
  imports: [PrismaModule, SpotifyModule],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}
