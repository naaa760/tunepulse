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
var SpotifyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let SpotifyService = SpotifyService_1 = class SpotifyService {
    configService;
    accessToken;
    tokenExpiry;
    logger = new common_1.Logger(SpotifyService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        await this.getAccessToken();
    }
    async getAccessToken() {
        if (this.accessToken && this.tokenExpiry > new Date()) {
            return this.accessToken;
        }
        const clientId = this.configService.get("SPOTIFY_CLIENT_ID");
        const clientSecret = this.configService.get("SPOTIFY_CLIENT_SECRET");
        if (!clientId || !clientSecret) {
            this.logger.error("Spotify credentials not configured");
            throw new Error("Spotify credentials not configured");
        }
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
        try {
            const response = await axios_1.default.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            this.accessToken = response.data.access_token;
            this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
            this.logger.log("Spotify access token obtained successfully");
            return this.accessToken;
        }
        catch (error) {
            this.logger.error("Failed to get Spotify access token", error);
            throw error;
        }
    }
    async searchTracks(query, limit = 20) {
        try {
            this.logger.log(`Searching Spotify for: ${query}`);
            const token = await this.getAccessToken();
            const response = await axios_1.default.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}&market=US`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.logger.log(`Found ${response.data.tracks.items.length} tracks on Spotify`);
            return response.data.tracks.items;
        }
        catch (error) {
            this.logger.error(`Failed to search Spotify tracks for query: ${query}`, error);
            return [];
        }
    }
    async getTrack(spotifyId) {
        const token = await this.getAccessToken();
        try {
            const response = await axios_1.default.get(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error(`Failed to get Spotify track ${spotifyId}`, error);
            return null;
        }
    }
};
exports.SpotifyService = SpotifyService;
exports.SpotifyService = SpotifyService = SpotifyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SpotifyService);
//# sourceMappingURL=spotify.service.js.map