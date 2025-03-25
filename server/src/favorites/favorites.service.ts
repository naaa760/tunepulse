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
    const { songId, userId } = createFavoriteDto;

    try {
      // First check if the song exists
      const song = await this.prisma.song.findUnique({
        where: { id: songId },
      });

      if (!song) {
        throw new HttpException("Song not found", HttpStatus.NOT_FOUND);
      }

      // Check for existing favorite
      const existingFavorite = await this.prisma.favorite.findFirst({
        where: {
          songId,
          userId,
        },
        include: {
          song: true,
        },
      });

      if (existingFavorite) {
        // Remove favorite
        await this.prisma.favorite.delete({
          where: {
            id: existingFavorite.id,
          },
        });
        return existingFavorite;
      }

      // Create new favorite
      const newFavorite = await this.prisma.favorite.create({
        data: {
          songId,
          userId,
        },
        include: {
          song: true,
        },
      });

      return newFavorite;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to toggle favorite",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
