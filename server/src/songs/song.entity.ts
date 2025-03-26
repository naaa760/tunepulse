import { Song as PrismaSong } from "@prisma/client";

export class Song implements PrismaSong {
  id: number;
  spotifyId: string | null;
  title: string;
  artist: string;
  album: string | null;
  releaseYear: number | null;
  genre: string | null;
  duration: number | null;
  imageUrl: string | null;
  previewUrl: string | null;
  popularity: number | null;
  externalUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
