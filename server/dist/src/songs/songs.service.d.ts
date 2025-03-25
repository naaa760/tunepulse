import { PrismaService } from "../prisma/prisma.service";
import { SpotifyService } from "../spotify/spotify.service";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "./song.entity";
export declare class SongsService {
    private prisma;
    private spotifyService;
    constructor(prisma: PrismaService, spotifyService: SpotifyService);
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    create(createSongDto: CreateSongDto): Promise<Song>;
}
