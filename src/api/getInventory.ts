// src/api/getUserInventory.ts
// 목적: 내 가방(/users/inventory) 조회
// 사용처: 마이페이지 진입 시 보유 아이템/완료율 표시 등
// 주의: 401/네트워크 에러는 apiClient에서 공통 처리

import apiClient from "./apiClient";
import { API_URL } from "./config";

/** 공통 타입 */
type ISODateString = string;

type AcquisitionDefault = {
  type: "default";
  description: string;
};

type AchievementInfo = {
  id: number;
  code: string;
  title: string;
  description: string;
  condition: Record<string, unknown>;
  is_unlocked: boolean;
};

type AcquisitionAchievement = {
  type: "achievement";
  achievement: AchievementInfo;
};

export type AcquisitionMethod = AcquisitionDefault | AcquisitionAchievement;

export type InventoryItem = {
  id: number;
  name: string;
  description: string;
  is_default: boolean;
  is_owned: boolean;
  acquired_at: ISODateString;
  created_at: ISODateString;
  acquisition_methods: AcquisitionMethod[];
};

export type InventoryTypeBlock = {
  type_id: number;          // 1=character, 2=outfit, 3=hat
  type_code: "character" | "outfit" | "hat";
  type_name: "캐릭터" | "한벌옷" | "모자";
  items: InventoryItem[];
};

export type InventorySummary = {
  total_items: number;      // 전체 아이템 수
  owned_items: number;      // 보유 아이템 수
  completion_rate: string;  // "58.3" 같은 퍼센트 문자열
};

export type Inventory = {
  summary: InventorySummary;
  items_by_type: {
    character?: InventoryTypeBlock;
    outfit?: InventoryTypeBlock;
    hat?: InventoryTypeBlock;
  };
};

export type InventoryResponse = {
  message: string;   // "가방 조회 성공"
  inventory: Inventory;
};

/**
 * 내 가방(/users/inventory)을 조회합니다.
 * 실패 시 Error를 던집니다.
 */
export async function getUserInventory(): Promise<InventoryResponse> {
  const res = await apiClient(`${API_URL}/users/inventory`, {
    method: "GET",
  });

  if (!res.ok) {
    // 401, 5xx 등 상황별 핸들링은 상위에서
    throw new Error(`/users/inventory 조회 실패: ${res.status}`);
  }

  const data = (await res.json()) as InventoryResponse;
  return data;
}

/** 선택: 편의 헬퍼들 (원하면 사용) */
export function calcCompletionNumber(summary: InventorySummary): number {
  // "58.3" → 58.3
  const n = Number(summary.completion_rate);
  return Number.isFinite(n) ? n : 0;
}

export function getItemsByType(inv: Inventory, type: "character" | "outfit" | "hat"): InventoryItem[] {
  return inv.items_by_type[type]?.items ?? [];
}
