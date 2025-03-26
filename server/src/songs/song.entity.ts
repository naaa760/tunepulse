export class Song {
  id: string;
  spotifyId: string;
  title: string;
  artist: string;
  albumArt: string | null;
  previewUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
