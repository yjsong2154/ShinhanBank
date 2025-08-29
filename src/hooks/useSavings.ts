import { API_URL } from "../api/config";
import useFetch from "./useFetch";
import apiClient from "../api/apiClient";

// API 응답을 위한 타입 정의
export interface CharacterItem {
  id: string;
  name: string;
}

export interface Character {
  character_item: CharacterItem;
  outfit_item: CharacterItem;
  hat_item: CharacterItem;
}

export interface Bucket {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_progress: number;
  status: string;
  is_challenge: boolean;
  like_count: number;
  view_count: number;
  comment_count: string;
  created_at: string;
  account_name: string;
  interest_rate: number;
  subscription_period: number;
  deposit_cycle: string;
  total_payment: number;
  success_payment: number;
  fail_payment: number;
  last_progress_date: string;
  account_no: string | null;
  character: Character;
}

export interface ApiResponse {
  message: string;
  buckets: Bucket[];
}

const fetchSavings = async (): Promise<Bucket[]> => {
  const response = await apiClient(`${API_URL}/users/buckets/?status=all&page=1`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    // apiClient에서 401은 처리되므로, 여기서는 다른 에러만 처리합니다.
    throw new Error("서버에서 데이터를 불러오는 데 실패했습니다.");
  }
  const data: ApiResponse = await response.json();
  return data.buckets;
};

const useSavings = () => {
  return useFetch<Bucket[]>(fetchSavings, []);
};

export default useSavings;
