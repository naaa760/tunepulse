import { Song } from "../songs/song.entity";
export declare class Favorite {
    id: number;
    songId: number;
    userId: string;
    createdAt: Date;
    song?: Song;
}
