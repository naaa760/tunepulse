export interface Song {
  id: string;
  spotifyId: string;
  title: string;
  artist: string;
  album: string;
  coverImage?: string | null;
  previewUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Favorite {
  id: string;
  userId: string;
  songId: string;
  createdAt: string;
  song: Song;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
