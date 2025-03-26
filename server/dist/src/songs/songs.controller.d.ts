import { SongsService } from "./songs.service";
import { Song } from "./song.entity";
export declare class SongsController {
    private songsService;
    private readonly logger;
    constructor(songsService: SongsService);
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
}
