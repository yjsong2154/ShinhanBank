// 파일 목적: 새 적금통 생성 가능한 상품 목록을 백엔드에서 조회합니다.
// 주의사항: 응답의 accountDescription은 JSON 문자열로, is_challenge 여부를 포함합니다.
// 사용처: NewBucketStart 페이지 진입 시 상품 목록 로드

import apiClient from "./apiClient";
import { API_URL } from "./config";

export type CreateListItem = {
  accountTypeUniqueNo: string;
  bankCode: string;
  bankName: string;
  accountTypeCode: string; // "2"(예금) | "3"(적금)
  accountTypeName: string; // "예금" | "적금"
  accountName: string;
  accountDescription: string; // JSON 문자열: {"is_challenge":"true|false", "description":"..."}
  subscriptionPeriod: string; // 일수 문자열
  minSubscriptionBalance: string; // 최소 납입/예치 금액
  maxSubscriptionBalance: string; // 최대 납입/예치 금액
  interestRate: string; // 퍼센트 문자열
  rateDescription: string;
};

/**
 * 상품 생성 리스트를 조회합니다.
 * 에러 시 예외를 던집니다.
 */
export async function getBucketCreateList(): Promise<CreateListItem[]> {
  // 네트워크 오류/401 처리는 apiClient에서 처리
  const res = await apiClient(`${API_URL}/bucket/create_list`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`create_list 조회 실패: ${res.status}`);
  }
  const data = (await res.json()) as CreateListItem[];
  return data;
}


