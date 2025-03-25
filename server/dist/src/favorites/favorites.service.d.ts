import { PrismaService } from "../prisma/prisma.service";
import { CreateFavoriteDto } from "../dto/create-favorite.dto";
import { Favorite } from "./favorite.entity";
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Favorite[]>;
    findByUserId(userId: string): Promise<Favorite[]>;
    toggleFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
}
