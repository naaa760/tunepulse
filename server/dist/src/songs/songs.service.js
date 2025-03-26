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
var SongsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const spotify_service_1 = require("../spotify/spotify.service");
let SongsService = SongsService_1 = class SongsService {
    prisma;
    spotifyService;
    logger = new common_1.Logger(SongsService_1.name);
    constructor(prisma, spotifyService) {
        this.prisma = prisma;
        this.spotifyService = spotifyService;
    }
    async findAll() {
        try {
            return await this.prisma.song.findMany({
                orderBy: { title: "asc" },
            });
        }
        catch (error) {
            this.logger.error("Error fetching all songs", error);
            return [];
        }
    }
    async search(query) {
        if (!query || query.trim() === "") {
            return this.findAll();
        }
        try {
            const localResults = await this.prisma.song.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { artist: { contains: query, mode: "insensitive" } },
                        { album: { contains: query, mode: "insensitive" } },
                    ],
                },
                orderBy: { popularity: "desc" },
            });
            if (localResults.length >= 10) {
                return localResults;
            }
            const spotifyResults = await this.spotifyService.searchTracks(query);
            const newSongs = [];
            for (const track of spotifyResults) {
                const existingSong = await this.prisma.song.findFirst({
                    where: { spotifyId: track.id },
                });
                if (!existingSong) {
                    const newSong = await this.prisma.song.create({
                        data: {
                            spotifyId: track.id,
                            title: track.name,
                            artist: track.artists.map((a) => a.name).join(", "),
                            album: track.album.name,
                            releaseYear: new Date(track.album.release_date).getFullYear(),
                            duration: track.duration_ms,
                            imageUrl: track.album.images[0]?.url,
                            previewUrl: track.preview_url,
                            popularity: track.popularity,
                            externalUrl: track.external_urls.spotify,
                        },
                    });
                    newSongs.push(newSong);
                }
                else {
                    newSongs.push(existingSong);
                }
            }
            const combinedResults = [...localResults];
            for (const song of newSongs) {
                if (!combinedResults.some((s) => s.id === song.id)) {
                    combinedResults.push(song);
                }
            }
            return combinedResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }
        catch (error) {
            this.logger.error(`Error searching songs for query: ${query}`, error);
            return [];
        }
    }
    async findOne(id) {
        try {
            const song = await this.prisma.song.findUnique({
                where: { id },
            });
            if (!song) {
                throw new common_1.NotFoundException(`Song with ID ${id} not found`);
            }
            return song;
        }
        catch (error) {
            this.logger.error(`Error fetching song with id ${id}`, error);
            throw error;
        }
    }
    async searchSongs(query) {
        this.logger.log(`Searching for songs with query: ${query}`);
        try {
            const dbSongs = await this.prisma.song.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { artist: { contains: query, mode: "insensitive" } },
                        { album: { contains: query, mode: "insensitive" } },
                    ],
                },
            });
            if (dbSongs.length > 0) {
                this.logger.log(`Found ${dbSongs.length} songs in database for query: ${query}`);
                return dbSongs;
            }
            this.logger.log(`No songs found in database, searching Spotify for: ${query}`);
            const spotifyTracks = await this.spotifyService.searchTracks(query);
            const songs = spotifyTracks.map((track) => ({
                id: null,
                title: track.name,
                artist: track.artists?.[0]?.name || "Unknown Artist",
                album: track.album?.name || "Unknown Album",
                releaseYear: track.album?.release_date
                    ? new Date(track.album.release_date).getFullYear()
                    : null,
                duration: track.duration_ms,
                imageUrl: track.album?.images?.[0]?.url || null,
                popularity: track.popularity || 0,
                spotifyId: track.id,
                genre: "Unknown",
                previewUrl: track.preview_url || null,
                externalUrl: track.external_urls?.spotify || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            this.logger.log(`Found ${songs.length} songs on Spotify for query: ${query}`);
            return songs;
        }
        catch (error) {
            this.logger.error(`Error searching songs: ${error.message}`, error.stack);
            return [];
        }
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = SongsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        spotify_service_1.SpotifyService])
], SongsService);
//# sourceMappingURL=songs.service.js.map