// 파일 목적: 적금통 생성 API 호출을 담당합니다.
// 주요 기능: /bucket/create 엔드포인트에 POST 요청 및 응답 반환
// 주의사항: 인증/401 처리는 apiClient 공통 로직을 통해 처리됩니다.

import apiClient from "./apiClient";
import { API_URL } from "./config";

export interface CreateBucketRequest {
  name: string;
  description: string;
  accountTypeUniqueNo: string;
  target_amount: number;
  is_public: "TRUE" | "FALSE";
  deposit_cycle: "daily" | "weekly" | "monthly";
  character_item_id: number;
  outfit_item_id: number;
  hat_item_id: number;
}

export interface CreateBucketResponse {
  success?: boolean;
  bucketId?: string;
  message?: string;
  [key: string]: unknown;
}

export async function createBucket(
  req: CreateBucketRequest,
): Promise<CreateBucketResponse> {
  const res = await apiClient(`${API_URL}/bucket/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(`bucket/create 실패: ${res.status}`);
  }

  // 백엔드 응답 스키마가 확정되지 않았을 수 있어 any 처리 후 얕은 캐스팅
  const data = (await res.json().catch(() => ({}))) as CreateBucketResponse;
  return data;
}


