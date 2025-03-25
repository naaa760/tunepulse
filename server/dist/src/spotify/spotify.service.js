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
exports.SpotifyService = void 0;
const common_1 = require("@nestjs/common");
let SpotifyService = class SpotifyService {
    spotifyToken;
    clientId = process.env.SPOTIFY_CLIENT_ID;
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    constructor() {
        this.getAccessToken();
    }
    async getAccessToken() {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " +
                        Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64"),
                },
                body: "grant_type=client_credentials",
            });
            if (!response.ok) {
                throw new Error("Failed to get Spotify token");
            }
            const data = (await response.json());
            this.spotifyToken = data.access_token;
        }
        catch (error) {
            console.error("Failed to get Spotify access token:", error);
            throw new Error(error.message || "Failed to get Spotify access token");
        }
    }
    async searchTracks(query) {
        try {
            if (!this.spotifyToken) {
                await this.getAccessToken();
            }
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=US&limit=10`, {
                headers: {
                    Authorization: `Bearer ${this.spotifyToken}`,
                },
            });
            if (response.status === 401) {
                await this.getAccessToken();
                return this.searchTracks(query);
            }
            if (!response.ok) {
                console.error(`Spotify API error: ${response.status}`);
                return [];
            }
            const data = (await response.json());
            if (!data.tracks ||
                !data.tracks.items ||
                data.tracks.items.length === 0) {
                console.log("No tracks found for query:", query);
                return [];
            }
            return data.tracks.items.map((track) => ({
                title: track.name,
                artist: track.artists[0].name,
                albumArt: track.album.images[0]?.url || null,
                duration: this.formatDuration(track.duration_ms),
                createdAt: new Date(),
                previewUrl: track.preview_url || null,
            }));
        }
        catch (error) {
            console.error("Error searching Spotify:", error);
            return [];
        }
    }
    formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
};
exports.SpotifyService = SpotifyService;
exports.SpotifyService = SpotifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SpotifyService);
//# sourceMappingURL=spotify.service.js.map