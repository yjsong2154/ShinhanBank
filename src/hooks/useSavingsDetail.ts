import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import apiClient from "../api/apiClient";
import { API_URL } from "../api/config";

// API 응답을 위한 상세 타입 정의
export interface Author {
  id: string;
  nickname: string;
  university: string;
  character: {
    character_item: { id: string; name: string };
    outfit_item: { id: string; name: string };
    hat_item: { id: string; name: string };
  };
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: Author;
}

export interface BucketDetail {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_progress: number;
  status: string;
  is_challenge: boolean;
  like_count: number;
  view_count: number;
  comment_count: number;
  created_at: string;
  is_liked: boolean;
  account_name: string;
  interest_rate: number;
  subscription_period: number;
  deposit_cycle: string;
  total_payment: number;
  success_payment: number;
  fail_payment: number;
  last_progress_date: string;
  owner: Author;
}

export interface SavingsDetailData {
  bucket: BucketDetail;
  comments: Comment[];
}

// fetcher 함수
const fetchSavingsDetail = async (id: string): Promise<SavingsDetailData> => {
  const response = await apiClient(`${API_URL}/bucket/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("적금 상세 정보를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

// 커스텀 훅
const useSavingsDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    // id가 없는 경우에 대한 처리. 실제로는 에러를 던지거나, 
    // 리다이렉트 하거나, null 상태를 반환하는 등의 처리가 필요합니다.
    return { data: null, loading: false, error: "ID가 URL에 지정되지 않았습니다." };
  }

  return useFetch<SavingsDetailData>(() => fetchSavingsDetail(id), [id]);
};

export default useSavingsDetail;
