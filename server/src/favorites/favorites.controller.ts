import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(@Body() body: { userId: string; songId: string }) {
    console.log('Adding favorite:', body);
    try {
      const { userId, songId } = body;
      console.log(`Adding favorite: userId=${userId}, songId=${songId}`);
      return await this.favoritesService.addFavorite(userId, songId);
    } catch (error) {
      console.error('Error in addFavorite controller:', error);
      throw new HttpException(
        error.message || 'Failed to add favorite',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':userId/:songId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.favoritesService.removeFavorite(userId, songId);
  }

  @Get('user/:userId')
  async getUserFavorites(@Param('userId') userId: string) {
    console.log('Getting favorites for user:', userId);
    try {
      console.log(`Fetching favorites for user: ${userId}`);
      const favorites = await this.favoritesService.getUserFavorites(userId);
      console.log(`Found ${favorites.length} favorites`);
      return favorites;
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  }

  @Get('check/:userId/:songId')
  checkFavorite(
    @Param('userId') userId: string,
    @Param('songId') songId: string,
  ) {
    return this.favoritesService.checkFavorite(userId, songId);
  }
}
