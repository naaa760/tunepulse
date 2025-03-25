import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Favorite } from "./favorite.entity";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    findAll(userId?: string): Promise<Favorite[]>;
    toggleFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
}
