import { SongsService } from "./songs.service";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "./song.entity";
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    findAll(): Promise<Song[]>;
    search(query: string): Promise<Song[]>;
    create(createSongDto: CreateSongDto): Promise<Song>;
}
