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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const create_favorite_dto_1 = require("../dto/create-favorite.dto");
let FavoritesController = class FavoritesController {
    favoritesService;
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async findAll() {
        const userId = 1;
        return this.favoritesService.findAll(userId);
    }
    async create(createFavoriteDto) {
        const userId = 1;
        try {
            const favorite = await this.favoritesService.create(userId, createFavoriteDto);
            return {
                success: true,
                message: "Song added to favorites",
                favorite,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof common_1.ConflictException) {
                return {
                    success: false,
                    message: error.message,
                };
            }
            return {
                success: false,
                message: "Failed to add song to favorites",
            };
        }
    }
    async remove(songId) {
        const userId = 1;
        try {
            await this.favoritesService.remove(userId, songId);
            return {
                success: true,
                message: "Song removed from favorites",
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return {
                    success: false,
                    message: error.message,
                };
            }
            return {
                success: false,
                message: "Failed to remove song from favorites",
            };
        }
    }
    async checkIsFavorite(songId) {
        const userId = 1;
        const isFavorite = await this.favoritesService.checkIsFavorite(userId, songId);
        return { isFavorite };
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(":songId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("songId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("check/:songId"),
    __param(0, (0, common_1.Param)("songId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "checkIsFavorite", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)("favorites"),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map