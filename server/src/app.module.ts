import { Module } from "@nestjs/common";
import { SongsModule } from "./songs/songs.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { AppController } from "./app.controller";
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [SongsModule, FavoritesModule, SpotifyModule],
  controllers: [AppController],
})
export class AppModule {}
