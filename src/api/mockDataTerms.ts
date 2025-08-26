// 파일 목적: 약관/설명서 문서 메타(mock) 제공
// 주요 섹션: 타입 정의, 문서 목록 상수
// 주의사항: 실제 API 대체 가능. docId는 라우트 매칭용.

export interface TermsDocMeta {
  id: string; // docId
  title: string;
  type: "guide" | "rate" | "early" | "etc" | "document";
  url?: string; // 문서 링크 (document 타입일 때 사용)
  pages?: number; // 페이지 수(알고 있을 경우)
}

export const termsDocuments: TermsDocMeta[] = [
  { id: "product-guide", title: "상품 안내", type: "guide" },
  { id: "interest-rate", title: "금리 정보", type: "rate" },
  { id: "early-termination", title: "미리 빼기 및 해지 안내", type: "early" },
  { id: "etc-info", title: "기타사항", type: "etc" },
  {
    id: "product-terms",
    title: "상품설명서 및 이용약관",
    type: "document",
    url: "/terms/product-terms.pdf",
    pages: 3,
  },
];


