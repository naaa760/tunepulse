import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Favorite } from "./favorite.entity";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post("toggle")
  async toggleFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    try {
      return await this.favoritesService.toggleFavorite(createFavoriteDto);
    } catch (error) {
      console.error("Toggle favorite error:", error);
      throw new HttpException(
        "Failed to toggle favorite",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(@Query("userId") userId?: string): Promise<Favorite[]> {
    try {
      if (userId) {
        return await this.favoritesService.findByUserId(userId);
      }
      return await this.favoritesService.findAll();
    } catch (error) {
      console.error("Get favorites error:", error);
      throw new HttpException(
        "Failed to fetch favorites",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
