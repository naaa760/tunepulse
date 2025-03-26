import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { SpotifyModule } from "./spotify/spotify.module";
import { SongsModule } from "./songs/songs.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SpotifyModule,
    SongsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
