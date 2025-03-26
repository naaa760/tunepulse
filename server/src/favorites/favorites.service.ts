import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, songId: string) {
    try {
      if (!userId || !songId) {
        throw new NotFoundException(
          `Invalid request: userId=${userId}, songId=${songId}`,
        );
      }

      // Check if song exists by spotifyId first (more reliable)
      let song = await this.prisma.song.findUnique({
        where: { spotifyId: songId },
      });

      // If not found by spotifyId, try by id
      if (!song) {
        song = await this.prisma.song.findUnique({
          where: { id: songId },
        });
      }

      if (!song) {
        throw new NotFoundException(`Song with ID ${songId} not found`);
      }

      // Always use the database ID for creating the favorite
      const dbSongId = song.id;

      // Check if user exists (or create a demo user if needed)
      let user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        // Create a demo user for testing
        user = await this.prisma.user.create({
          data: {
            id: userId,
            email: `${userId}@example.com`,
            name: `User ${userId}`,
          },
        });
      }

      // Check if favorite already exists
      const existingFavorite = await this.prisma.favorite.findFirst({
        where: {
          userId,
          songId: dbSongId,
        },
      });

      if (existingFavorite) {
        return existingFavorite;
      }

      // Create favorite
      return this.prisma.favorite.create({
        data: {
          userId,
          songId: dbSongId,
        },
        include: {
          song: true,
        },
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add favorite');
    }
  }

  async removeFavorite(userId: string, songId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        songId,
      },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite not found`);
    }

    return this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        song: true,
      },
    });
  }

  async checkFavorite(userId: string, songId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        songId,
      },
    });

    return { isFavorite: !!favorite };
  }
}
