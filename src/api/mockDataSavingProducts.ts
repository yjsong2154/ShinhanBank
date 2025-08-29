// 파일 목적: 적금/예금 상품(목록) 모의 데이터 제공
// 주요 섹션: 타입/데이터 정의, 상품 배열(savingProducts)
// 주의사항: 금리/이자 계산은 프론트에서 하지 않음. 표시는 세전 기준 값만 노출.

export type ProductType = "fixed" | "flexible" | "td";

export interface SavingProductItem {
  id: string;
  type: ProductType;
  name: string;
  baseRate: number; // 세전 기본 금리 (%), 예: 3.2 => 3.2%
  maxRate: number; // 세전 최대 금리 (%)
  terms: number[]; // 제공 기간(개월) 이산 값
}

// 상품 더미 데이터: 실제 API로 대체될 수 있음
export const savingProducts: SavingProductItem[] = [
  {
    id: "FIXED-365",
    type: "fixed",
    name: "정기적금 365",
    baseRate: 3.2,
    maxRate: 4.5,
    terms: [3, 6, 12],
  },
  {
    id: "FIXED-YOUTH",
    type: "fixed",
    name: "청년 희망 적금",
    baseRate: 3.8,
    maxRate: 5.0,
    terms: [6, 12, 24],
  },
  {
    id: "FLEX-FREE",
    type: "flexible",
    name: "자유적금 플러스",
    baseRate: 2.8,
    maxRate: 4.0,
    terms: [3, 6, 12],
  },
  {
    id: "FLEX-MATE",
    type: "flexible",
    name: "자유적금 메이트",
    baseRate: 2.6,
    maxRate: 3.6,
    terms: [6, 12, 18],
  },
  {
    id: "TD-REGULAR",
    type: "td",
    name: "정기예금 베이직",
    baseRate: 3.0,
    maxRate: 3.8,
    terms: [1, 3, 6, 12],
  },
  {
    id: "TD-PLUS",
    type: "td",
    name: "정기예금 플러스",
    baseRate: 3.3,
    maxRate: 4.1,
    terms: [3, 6, 12, 24],
  },
];


