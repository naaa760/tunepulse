export interface Song {
  id: number;
  spotifyId?: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear?: number;
  genre?: string;
  duration?: number; // in milliseconds
  imageUrl?: string;
  previewUrl?: string; // Spotify preview URL
  popularity?: number; // Spotify popularity score
  externalUrl?: string; // Link to Spotify
  createdAt?: Date;
  updatedAt?: Date;
}
