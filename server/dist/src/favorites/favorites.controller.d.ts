import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Song } from "../songs/song.entity";
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    findAll(): Promise<Song[]>;
    create(createFavoriteDto: CreateFavoriteDto): Promise<{
        success: boolean;
        message: string;
        favorite: import("./favorite.entity").Favorite;
    } | {
        success: boolean;
        message: string;
        favorite?: undefined;
    }>;
    remove(songId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    checkIsFavorite(songId: number): Promise<{
        isFavorite: boolean;
    }>;
}
