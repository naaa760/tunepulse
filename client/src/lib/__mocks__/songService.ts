import { Song } from "@/types/Song";

const mockSongs: Song[] = [
  {
    id: 1,
    title: "Despacito",
    artist: "Luis Fonsi",
    albumArt: "/mock-album-art.jpg",
    duration: "3:47",
    previewUrl: "https://example.com/preview.mp3",
    createdAt: new Date().toISOString(),
  },
];

export class SongService {
  async getAllSongs(): Promise<Song[]> {
    return Promise.resolve([...mockSongs]);
  }

  async searchSongs(query: string): Promise<Song[]> {
    if (query.toLowerCase() === "xxxxxxxxxxx") {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}

export const songService = new SongService();
