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
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const spotify_service_1 = require("../spotify/spotify.service");
let SongsService = class SongsService {
    prisma;
    spotifyService;
    constructor(prisma, spotifyService) {
        this.prisma = prisma;
        this.spotifyService = spotifyService;
    }
    async findAll() {
        try {
            const songs = await this.prisma.song.findMany();
            return songs;
        }
        catch (error) {
            console.error("Error fetching songs:", error);
            throw new Error("Failed to fetch songs");
        }
    }
    async search(query) {
        try {
            const spotifyResults = await this.spotifyService.searchTracks(query);
            if (spotifyResults.length === 0) {
                console.log("No results found for query:", query);
                return [];
            }
            const savedSongs = await Promise.all(spotifyResults.map((songData) => this.prisma.song.upsert({
                where: {
                    title_artist: {
                        title: songData.title,
                        artist: songData.artist,
                    },
                },
                update: {},
                create: {
                    title: songData.title,
                    artist: songData.artist,
                    albumArt: songData.albumArt,
                    duration: songData.duration,
                    createdAt: songData.createdAt,
                    previewUrl: songData.previewUrl,
                },
            })));
            return savedSongs;
        }
        catch (error) {
            console.error("Error searching songs:", error);
            return [];
        }
    }
    async create(createSongDto) {
        try {
            const song = (await this.prisma.song.create({
                data: createSongDto,
            }));
            return song;
        }
        catch (error) {
            console.error("Error creating song:", error);
            throw new Error("Failed to create song");
        }
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        spotify_service_1.SpotifyService])
], SongsService);
//# sourceMappingURL=songs.service.js.map