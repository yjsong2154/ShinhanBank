import { API_URL } from "../api/config";
import useFetch from "./useFetch";
import apiClient from "../api/apiClient";

// API 응답을 위한 타입 정의
interface Owner {
  id: string;
  nickname: string;
  university: string;
  character: {
    character_item: { id: string; name: string };
    outfit_item: { id: string; name: string };
    hat_item: { id: string; name: string };
  };
}

interface ApiBucket {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_progress: number;
  like_count: number;
  comment_count: number;
  subscription_period: number;
  owner: Owner;
}

interface ApiResponse {
  buckets: ApiBucket[];
}

// 컴포넌트에서 사용할 데이터 형식
export interface Feed {
  id: string;
  author: string;
  title: string;
  content: string;
  period: string;
  target: number;
  current: number;
  likes: number;
  comments: number;
  characterId: number;
  clothId: number;
  hatId: number;
}

const fetchFeed = async (category: string): Promise<Feed[]> => {
  const response = await apiClient(`${API_URL}/bucket/?category=${category}&page=1`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("피드 데이터를 불러오는 데 실패했습니다.");
  }
  const data: ApiResponse = await response.json();
  console.log("feed data ",data)

  // API 응답을 컴포넌트의 데이터 형식으로 변환
  return data.buckets.map((bucket) => ({
    id: bucket.id,
    author: bucket.owner.nickname,
    title: bucket.name,
    content: bucket.description,
    period: `${bucket.subscription_period}일`, // 숫자를 문자열로 변환
    target: bucket.target_amount,
    current: (bucket.current_progress / 100) * bucket.target_amount,
    likes: bucket.like_count,
    comments: bucket.comment_count,
    characterId: parseInt(bucket.owner.character.character_item.id),
    clothId: parseInt(bucket.owner.character.outfit_item.id),
    hatId: parseInt(bucket.owner.character.hat_item.id),
  }));
};

const useFeed = (category: string) => {
  return useFetch<Feed[]>(() => fetchFeed(category), [category]);
};

export default useFeed;
