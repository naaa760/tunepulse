import { Favorite as PrismaFavorite } from "@prisma/client";
export declare class Favorite implements PrismaFavorite {
    id: number;
    userId: number;
    songId: number;
    createdAt: Date;
}
