import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class SpotifyService implements OnModuleInit {
    private configService;
    private accessToken;
    private tokenExpiry;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private getAccessToken;
    searchTracks(query: string, limit?: number): Promise<any[]>;
    getTrack(spotifyId: string): Promise<any>;
}
