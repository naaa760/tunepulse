import { Favorite } from "../favorites/favorite.entity";
export declare class Song {
    id: number;
    title: string;
    artist: string;
    albumArt: string | null;
    duration: string;
    createdAt: Date;
    previewUrl: string | null;
    favorites?: Favorite[];
}
