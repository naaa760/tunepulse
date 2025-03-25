import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
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
      return await this.prisma.favorite.findMany({
        where: { userId },
        include: { song: true },
      });
    } catch (error) {
      console.error("Error in findByUserId:", error);
      throw new HttpException(
        "Failed to fetch favorites",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async toggleFavorite(
    createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    try {
      const { songId, userId } = createFavoriteDto;

      // Check if favorite exists
      const existingFavorite = await this.prisma.favorite.findUnique({
        where: {
          songId_userId: {
            songId,
            userId,
          },
        },
        include: { song: true },
      });

      if (existingFavorite) {
        // Delete if exists
        await this.prisma.favorite.delete({
          where: {
            id: existingFavorite.id,
          },
        });
        return existingFavorite;
      } else {
        // Create if doesn't exist
        return await this.prisma.favorite.create({
          data: {
            songId,
            userId,
          },
          include: { song: true },
        });
      }
    } catch (error) {
      console.error("Error in toggleFavorite:", error);
      throw new HttpException(
        "Failed to toggle favorite",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
