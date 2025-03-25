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
      console.log("Received toggle request:", createFavoriteDto);
      const result =
        await this.favoritesService.toggleFavorite(createFavoriteDto);
      console.log("Toggle result:", result);
      return result;
    } catch (error) {
      console.error("Toggle favorite error:", error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to toggle favorite",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
