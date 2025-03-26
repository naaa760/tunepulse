export interface Favorite {
  id: number;
  userId: number;
  songId: number;
  createdAt: Date;
}

export interface FavoriteResponse {
  success: boolean;
  message?: string;
  favorite?: Favorite;
}
