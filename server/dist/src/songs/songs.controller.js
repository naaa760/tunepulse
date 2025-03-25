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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs.service");
const create_song_dto_1 = require("../dto/create-song.dto");
let SongsController = class SongsController {
    songsService;
    constructor(songsService) {
        this.songsService = songsService;
    }
    async findAll() {
        try {
            return await this.songsService.findAll();
        }
        catch (error) {
            console.error("Error in findAll:", error);
            throw new common_1.HttpException("Failed to fetch songs", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(query) {
        try {
            if (!query || query.trim() === "") {
                return this.songsService.findAll();
            }
            console.log("Searching for:", query);
            const results = await this.songsService.search(query);
            return results;
        }
        catch (error) {
            console.error("Search error:", error);
            return [];
        }
    }
    create(createSongDto) {
        return this.songsService.create(createSongDto);
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "search", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_song_dto_1.CreateSongDto]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "create", null);
exports.SongsController = SongsController = __decorate([
    (0, common_1.Controller)("songs"),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map