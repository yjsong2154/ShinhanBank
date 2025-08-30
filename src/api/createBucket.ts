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
  outfit_item_id?: number; // optional로 변경
  hat_item_id?: number;    // optional로 변경
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
  // 조건에 맞는 요청 본문 생성
  const requestBody: any = {
    name: req.name,
    description: req.description,
    accountTypeUniqueNo: req.accountTypeUniqueNo,
    target_amount: req.target_amount,
    is_public: req.is_public,
    deposit_cycle: req.deposit_cycle,
    character_item_id: req.character_item_id,
  };

  // outfit_item_id가 0이 아니면 추가
  if (req.outfit_item_id !== 0) {
    requestBody.outfit_item_id = req.outfit_item_id;
  }

  // hat_item_id가 0이 아니면 추가
  if (req.hat_item_id !== 0) {
    requestBody.hat_item_id = req.hat_item_id;
  }

  // POST 요청 전송
  const res = await apiClient(`${API_URL}/bucket/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error(`bucket/create 실패: ${res.status}`);
  }

  // 백엔드 응답 스키마가 확정되지 않았을 수 있어 any 처리 후 얕은 캐스팅
  const data = (await res.json().catch(() => ({}))) as CreateBucketResponse;
  return data;
}
