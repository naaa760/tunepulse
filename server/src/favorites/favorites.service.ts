import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Favorite } from "./favorite.entity";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Song } from "../songs/song.entity";

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: number): Promise<Song[]> {
    try {
      const favorites = await this.prisma.favorite.findMany({
        where: { userId },
        include: { song: true },
        orderBy: { createdAt: "desc" },
      });

      return favorites.map((favorite) => favorite.song);
    } catch (error) {
      this.logger.error(`Error fetching favorites for user ${userId}`, error);
      return [];
    }
  }

  async create(
    userId: number,
    createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    const { songId } = createFavoriteDto;

    try {
      // Check if song exists
      const song = await this.prisma.song.findUnique({
        where: { id: songId },
      });

      if (!song) {
        throw new NotFoundException(`Song with ID ${songId} not found`);
      }

      // Check if favorite already exists
      const existingFavorite = await this.prisma.favorite.findFirst({
        where: {
          userId,
          songId,
        },
      });

      if (existingFavorite) {
        throw new ConflictException("Song is already in favorites");
      }

      // Create favorite
      return await this.prisma.favorite.create({
        data: {
          userId,
          songId,
        },
      });
    } catch (error) {
      this.logger.error(
        `Error creating favorite for user ${userId}, song ${songId}`,
        error
      );
      throw error;
    }
  }

  async remove(userId: number, songId: number): Promise<void> {
    try {
      const favorite = await this.prisma.favorite.findFirst({
        where: {
          userId,
          songId,
        },
      });

      if (!favorite) {
        throw new NotFoundException(`Favorite not found for song ID ${songId}`);
      }

      await this.prisma.favorite.delete({
        where: { id: favorite.id },
      });
    } catch (error) {
      this.logger.error(
        `Error removing favorite for user ${userId}, song ${songId}`,
        error
      );
      throw error;
    }
  }

  async checkIsFavorite(userId: number, songId: number): Promise<boolean> {
    try {
      const favorite = await this.prisma.favorite.findFirst({
        where: {
          userId,
          songId,
        },
      });

      return !!favorite;
    } catch (error) {
      this.logger.error(
        `Error checking favorite status for user ${userId}, song ${songId}`,
        error
      );
      return false;
    }
  }
}
