import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Favorite } from "./favorite.entity";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Query("userId") userId?: string): Promise<Favorite[]> {
    if (userId) {
      return this.favoritesService.findByUserId(userId);
    }
    return this.favoritesService.findAll();
  }

  @Post("toggle")
  toggleFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    return this.favoritesService.toggleFavorite(createFavoriteDto);
  }
}
