import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';
import { ToggleFavoriteDto } from '../dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorite[]> {
    return this.favoritesService.findAll();
  }

  @Post('toggle')
  async toggle(
    @Body() toggleFavoriteDto: ToggleFavoriteDto,
  ): Promise<{ success: boolean; favorite: Favorite | null }> {
    const favorite = await this.favoritesService.toggle(toggleFavoriteDto);
    return {
      success: true,
      favorite,
    };
  }

  @Get('check/:songId')
  async check(
    @Param('songId') songId: string,
  ): Promise<{ isFavorite: boolean }> {
    const isFavorite = await this.favoritesService.checkFavorite(songId);
    return { isFavorite };
  }
}
