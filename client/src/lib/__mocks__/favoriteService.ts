import { Favorite } from "@/types/Favorite";

const mockFavorites: Favorite[] = [];

export class FavoriteService {
  async getFavorites(): Promise<Favorite[]> {
    return Promise.resolve([...mockFavorites]);
  }

  async toggleFavorite(songId: number): Promise<void> {
    const existingIndex = mockFavorites.findIndex(
      (fav) => fav.songId === songId
    );

    if (existingIndex >= 0) {
      mockFavorites.splice(existingIndex, 1);
    } else {
      mockFavorites.push({
        id: Date.now(),
        songId: songId,
        userId: "test-user",
        createdAt: new Date().toISOString(),
      });
    }

    return Promise.resolve();
  }
}

export const favoriteService = new FavoriteService();
