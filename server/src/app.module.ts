import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { RootController } from './root.controller';

@Module({
  imports: [PrismaModule, SongsModule, FavoritesModule],
  controllers: [AppController, RootController],
})
export class AppModule {}
