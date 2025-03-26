import { PrismaService } from "../prisma/prisma.service";
import { SpotifyService } from "../spotify/spotify.service";
import { Song } from "./song.entity";
export declare class SongsService {
    private prisma;
    private spotifyService;
    private readonly logger;
    constructor(prisma: PrismaService, spotifyService: SpotifyService);
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    searchSongs(query: string): Promise<Song[]>;
}
