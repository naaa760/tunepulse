import { Song } from '../songs/song.entity';

export class Favorite {
  id: string;
  songId: string;
  userId: string;
  createdAt: Date;
  song?: Song;
}
