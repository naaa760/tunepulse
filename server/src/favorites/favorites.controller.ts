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

  @Get()
  async findAll(@Query("userId") userId?: string): Promise<Favorite[]> {
    if (!userId) {
      throw new HttpException("UserId is required", HttpStatus.BAD_REQUEST);
    }
    return this.favoritesService.findByUserId(userId);
  }

  @Post("toggle")
  async toggleFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    try {
      return await this.favoritesService.toggleFavorite(createFavoriteDto);
    } catch (error) {
      throw new HttpException(
        "Failed to toggle favorite",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
