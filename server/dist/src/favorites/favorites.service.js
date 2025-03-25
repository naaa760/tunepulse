"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            const favorites = (await this.prisma.favorite.findMany({
                include: {
                    song: true,
                },
            }));
            return favorites;
        }
        catch (error) {
            console.error("Error fetching favorites:", error);
            throw new Error("Failed to fetch favorites");
        }
    }
    async findByUserId(userId) {
        try {
            const favorites = (await this.prisma.favorite.findMany({
                where: {
                    userId,
                },
                include: {
                    song: true,
                },
            }));
            return favorites;
        }
        catch (error) {
            console.error(`Error fetching favorites for user ${userId}:`, error);
            throw new Error(`Failed to fetch favorites for user ${userId}`);
        }
    }
    async toggleFavorite(createFavoriteDto) {
        try {
            const existingFavorite = (await this.prisma.favorite.findFirst({
                where: {
                    songId: createFavoriteDto.songId,
                    userId: createFavoriteDto.userId,
                },
                include: {
                    song: true,
                },
            }));
            if (existingFavorite) {
                await this.prisma.favorite.delete({
                    where: {
                        id: existingFavorite.id,
                    },
                });
                return existingFavorite;
            }
            const favorite = (await this.prisma.favorite.create({
                data: createFavoriteDto,
                include: {
                    song: true,
                },
            }));
            return favorite;
        }
        catch (error) {
            console.error("Error toggling favorite:", error);
            throw new Error("Failed to toggle favorite");
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map