import { PrismaService } from "../prisma/prisma.service";
import { Favorite } from "./favorite.entity";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Song } from "../songs/song.entity";
export declare class FavoritesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(userId: number): Promise<Song[]>;
    create(userId: number, createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
    remove(userId: number, songId: number): Promise<void>;
    checkIsFavorite(userId: number, songId: number): Promise<boolean>;
}
