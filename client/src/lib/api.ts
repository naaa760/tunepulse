const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchFromAPI = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
