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
var FavoritesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = FavoritesService_1 = class FavoritesService {
    prisma;
    logger = new common_1.Logger(FavoritesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId) {
        try {
            const favorites = await this.prisma.favorite.findMany({
                where: { userId },
                include: { song: true },
                orderBy: { createdAt: "desc" },
            });
            return favorites.map((favorite) => favorite.song);
        }
        catch (error) {
            this.logger.error(`Error fetching favorites for user ${userId}`, error);
            return [];
        }
    }
    async create(userId, createFavoriteDto) {
        const { songId } = createFavoriteDto;
        try {
            const song = await this.prisma.song.findUnique({
                where: { id: songId },
            });
            if (!song) {
                throw new common_1.NotFoundException(`Song with ID ${songId} not found`);
            }
            const existingFavorite = await this.prisma.favorite.findFirst({
                where: {
                    userId,
                    songId,
                },
            });
            if (existingFavorite) {
                throw new common_1.ConflictException("Song is already in favorites");
            }
            return await this.prisma.favorite.create({
                data: {
                    userId,
                    songId,
                },
            });
        }
        catch (error) {
            this.logger.error(`Error creating favorite for user ${userId}, song ${songId}`, error);
            throw error;
        }
    }
    async remove(userId, songId) {
        try {
            const favorite = await this.prisma.favorite.findFirst({
                where: {
                    userId,
                    songId,
                },
            });
            if (!favorite) {
                throw new common_1.NotFoundException(`Favorite not found for song ID ${songId}`);
            }
            await this.prisma.favorite.delete({
                where: { id: favorite.id },
            });
        }
        catch (error) {
            this.logger.error(`Error removing favorite for user ${userId}, song ${songId}`, error);
            throw error;
        }
    }
    async checkIsFavorite(userId, songId) {
        try {
            const favorite = await this.prisma.favorite.findFirst({
                where: {
                    userId,
                    songId,
                },
            });
            return !!favorite;
        }
        catch (error) {
            this.logger.error(`Error checking favorite status for user ${userId}, song ${songId}`, error);
            return false;
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = FavoritesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map