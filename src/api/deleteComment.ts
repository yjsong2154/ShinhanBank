import apiClient from "./apiClient";
import { API_URL } from "./config";

const toInt = (v: string | number, name: string) => {
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isInteger(n)) throw new Error(`${name} must be an integer`);
  return n;
};

/**
 * DELETE /bucket/:id/comments/:commentId
 * params: id(INT), commentId(INT)
 * body: {}
 */
export const deleteComment = async (
  bucketId: string | number,
  commentId: string | number
) => {
  const id = toInt(bucketId, "bucketId");
  const cid = toInt(commentId, "commentId");
  console.log(id, cid);
  const response = await apiClient(`${API_URL}/bucket/${id}/comments/${cid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // 문서 스펙에 맞춤(바디는 안 보냄)
    },
    // body: undefined  // ← 명시적으로 바디 없음
  });

  if (!response.ok) {
    let message = `Failed to delete comment: ${response.status}`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) return { success: true };
  try {
    return await response.json();
  } catch {
    return { success: true };
  }
};

export default deleteComment;
