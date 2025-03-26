export interface SpotifyTrackDto {
  spotifyId: string;
  title: string;
  artist: string;
  album: string;
  coverImage: string | null;
  previewUrl: string | null;
}
