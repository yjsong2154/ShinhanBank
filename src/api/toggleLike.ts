import { API_URL } from "./config";
import apiClient from "./apiClient";

export const toggleLike = async (bucketId: string) => {
  const token = sessionStorage.getItem("token");

  const response = await apiClient(`${API_URL}/bucket/${bucketId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to toggle like: ${response.status}`);
  }

  return response.json();
};
