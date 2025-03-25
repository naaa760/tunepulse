import { Song } from "../songs/song.entity";
export declare class SpotifyService {
    private spotifyToken;
    private readonly clientId;
    private readonly clientSecret;
    constructor();
    private getAccessToken;
    searchTracks(query: string): Promise<Array<Omit<Song, "id" | "favorites">>>;
    private formatDuration;
}
