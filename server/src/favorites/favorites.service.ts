import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  // For demo purposes, we'll use a hardcoded user ID
  // In a real app, you'd get this from authentication
  private readonly defaultUserId = '00000000-0000-0000-0000-000000000000';

  // Get all favorites for a user
  async findAll(): Promise<Favorite[]> {
    // Make sure our demo user exists
    await this.ensureUserExists();

    return this.prisma.favorite.findMany({
      where: { userId: this.defaultUserId },
      include: { song: true },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Favorite[];
  }

  // Toggle a favorite (add if doesn't exist, remove if it does)
  async toggle(toggleFavoriteDto: ToggleFavoriteDto): Promise<Favorite | null> {
    const { songId } = toggleFavoriteDto;

    // Make sure our demo user exists
    await this.ensureUserExists();

    // Check if the song exists
    const song = await this.prisma.song.findUnique({
      where: { id: songId },
    });

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    // Check if the favorite already exists
    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        songId_userId: {
          songId,
          userId: this.defaultUserId,
        },
      },
    });

    // If it exists, delete it
    if (existingFavorite) {
      await this.prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return null;
    }

    // If it doesn't exist, create it
    return this.prisma.favorite.create({
      data: {
        songId,
        userId: this.defaultUserId,
      },
      include: { song: true },
    }) as unknown as Favorite;
  }

  // Check if a song is favorited by the user
  async checkFavorite(songId: string): Promise<boolean> {
    // Make sure our demo user exists
    await this.ensureUserExists();

    const favorite = await this.prisma.favorite.findUnique({
      where: {
        songId_userId: {
          songId,
          userId: this.defaultUserId,
        },
      },
    });

    return !!favorite;
  }

  // Ensure the default user exists
  private async ensureUserExists(): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: this.defaultUserId },
    });

    if (!user) {
      await this.prisma.user.create({
        data: {
          id: this.defaultUserId,
          email: 'demo@example.com',
          name: 'Demo User',
        },
      });
    }
  }
}
