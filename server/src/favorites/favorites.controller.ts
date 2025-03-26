import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  ConflictException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Song } from "../songs/song.entity";

@Controller("favorites")
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    // For simplicity, using a hardcoded user ID (1)
    // In a real app, you would get this from authentication
    const userId = 1;
    return this.favoritesService.findAll(userId);
  }

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    // For simplicity, using a hardcoded user ID (1)
    const userId = 1;

    try {
      const favorite = await this.favoritesService.create(
        userId,
        createFavoriteDto
      );
      return {
        success: true,
        message: "Song added to favorites",
        favorite,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: false,
        message: "Failed to add song to favorites",
      };
    }
  }

  @Delete(":songId")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("songId", ParseIntPipe) songId: number) {
    // For simplicity, using a hardcoded user ID (1)
    const userId = 1;

    try {
      await this.favoritesService.remove(userId, songId);
      return {
        success: true,
        message: "Song removed from favorites",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: false,
        message: "Failed to remove song from favorites",
      };
    }
  }

  @Get("check/:songId")
  async checkIsFavorite(@Param("songId", ParseIntPipe) songId: number) {
    // For simplicity, using a hardcoded user ID (1)
    const userId = 1;

    const isFavorite = await this.favoritesService.checkIsFavorite(
      userId,
      songId
    );
    return { isFavorite };
  }
}
