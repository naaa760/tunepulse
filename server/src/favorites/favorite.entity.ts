import { Song } from "../songs/song.entity";

export class Favorite {
  id: number;
  songId: number;
  userId: string;
  createdAt: Date;
  song?: Song;
}
