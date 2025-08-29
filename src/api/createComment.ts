import apiClient from "./apiClient";
import { API_URL } from "./config";

interface CommentData {
  content: string;
}

export const createComment = async (bucketId: string, data: CommentData) => {
  const token = sessionStorage.getItem("token");

  const response = await apiClient(`${API_URL}/bucket/${bucketId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to post comment: ${response.status}`);
  }

  return response.json();
};
