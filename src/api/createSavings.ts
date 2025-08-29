// 파일 목적: 적금/예금 개설 API 모의 구현
// 주요 섹션: 요청/응답 타입, 모의 openBucket 함수(지연 후 성공/실패 반환)
// 주의사항: 백엔드 연동 전까지 사용. 네트워크 호출 없음.

export interface OpenBucketRequest {
  productType: "fixed" | "flexible" | "td";
  productId: string;
  periodDays: number;
  amount: number; // 매일 납입 또는 일시 예치 금액
  executeTime?: string; // HH:MM, 고정/자유에서 사용
}

export interface OpenBucketResponse {
  success: boolean;
  bucketId?: string;
  message?: string;
}

export async function openBucket(
  req: OpenBucketRequest,
): Promise<OpenBucketResponse> {
  // 실제 백엔드 연결 전까지는 모의 응답으로 동작합니다.
  // 백엔드 연결 시 아래 fetch 코드를 주석 해제하고, 상단의 모의 지연/성공 응답을 제거하세요.

  // 간단 지연(모의)
  await new Promise((resolve) => setTimeout(resolve, 600));

  // 간단 검증: 필수값 없으면 실패로 응답
  if (!req.productId || !req.periodDays || !req.amount) {
    return { success: false, message: "요청 파라미터가 올바르지 않습니다." };
  }

  return {
    success: true,
    bucketId: `mock-${req.productType}-${Date.now()}`,
  };

  /* 실제 백엔드 예시
  import { buildUrl } from './env';
  try {
    const res = await fetch(buildUrl('/api/buckets'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      return { success: false, message: `HTTP ${res.status}` };
    }
    const data = await res.json() as OpenBucketResponse;
    return data;
  } catch (e) {
    return { success: false, message: '네트워크 오류' };
  }
  */
}


