import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

console.log("API URL:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTopTracks = async () => {
  try {
    const url = "/songs/top-tracks";
    console.log("Fetching top tracks from:", `${API_URL}${url}`);

    const response = await axiosInstance.get(url);
    console.log("Top tracks response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

export const searchSongs = async (query: string) => {
  const response = await axiosInstance.get(
    `/songs/search?query=${encodeURIComponent(query)}`
  );
  return response.data;
};

export const getUserFavorites = async (userId: string) => {
  const response = await axiosInstance.get(`/favorites/user/${userId}`);
  return response.data;
};

export const addFavorite = async (userId: string, songId: string) => {
  const response = await axiosInstance.post("/favorites", { userId, songId });
  return response.data;
};

export const removeFavorite = async (userId: string, songId: string) => {
  const response = await axiosInstance.delete(`/favorites/${userId}/${songId}`);
  return response.data;
};

export const checkFavorite = async (userId: string, songId: string) => {
  const response = await axiosInstance.get(
    `/favorites/check/${userId}/${songId}`
  );
  return response.data;
};

export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
  duration?: number;
  coverImage?: string;
}

export const api = {
  async getAllSongs(): Promise<Song[]> {
    const response = await axiosInstance.get("/songs");
    return response.data;
  },

  async getSong(id: number): Promise<Song> {
    const response = await axiosInstance.get(`/songs/${id}`);
    return response.data;
  },

  async addToFavorites(songId: number): Promise<void> {
    await axiosInstance.post(`/songs/${songId}/favorite`, {
      userId: 1,
    });
  },

  async removeFromFavorites(songId: number): Promise<void> {
    await axiosInstance.delete(`/songs/${songId}/favorite`, {
      data: { userId: 1 },
    });
  },

  async getFavorites(): Promise<Song[]> {
    const response = await axiosInstance.get("/songs/user/1/favorites");
    return response.data;
  },

  async isFavorite(songId: number): Promise<boolean> {
    const response = await axiosInstance.get(`/songs/${songId}/favorite/1`);
    return response.data.isFavorite;
  },
};
