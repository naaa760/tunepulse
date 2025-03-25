export interface Favorite {
  id: number;
  songId: number;
  userId: string; // We'll use this later when we implement authentication
  createdAt: string;
}
