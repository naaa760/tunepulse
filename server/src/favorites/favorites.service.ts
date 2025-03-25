import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Favorite } from "./favorite.entity";

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Favorite[]> {
    try {
      const favorites = (await this.prisma.favorite.findMany({
        include: {
          song: true,
        },
      })) as unknown as Favorite[];
      return favorites;
    } catch (error: any) {
      console.error("Error fetching favorites:", error);
      throw new Error("Failed to fetch favorites");
    }
  }

  async findByUserId(userId: string): Promise<Favorite[]> {
    try {
      const favorites = (await this.prisma.favorite.findMany({
        where: {
          userId,
        },
        include: {
          song: true,
        },
      })) as unknown as Favorite[];
      return favorites;
    } catch (error: any) {
      console.error(`Error fetching favorites for user ${userId}:`, error);
      throw new Error(`Failed to fetch favorites for user ${userId}`);
    }
  }

  async toggleFavorite(
    createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    try {
      const existingFavorite = (await this.prisma.favorite.findFirst({
        where: {
          songId: createFavoriteDto.songId,
          userId: createFavoriteDto.userId,
        },
        include: {
          song: true,
        },
      })) as unknown as Favorite | null;

      if (existingFavorite) {
        // If favorite exists, remove it
        await this.prisma.favorite.delete({
          where: {
            id: existingFavorite.id,
          },
        });
        return existingFavorite;
      }

      // If favorite doesn't exist, create it
      const favorite = (await this.prisma.favorite.create({
        data: createFavoriteDto,
        include: {
          song: true,
        },
      })) as unknown as Favorite;
      return favorite;
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      throw new Error("Failed to toggle favorite");
    }
  }
}
