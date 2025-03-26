import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { SpotifyModule } from "./spotify/spotify.module";
import { SongsModule } from "./songs/songs.module";
import { FavoritesModule } from "./favorites/favorites.module";

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
})
export class AppModule {}
