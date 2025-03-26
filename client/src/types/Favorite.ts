import { Song } from "./Song";

export interface Favorite {
  id: string;
  songId: string;
  userId: string;
  createdAt: string;
  song?: Song;
}
