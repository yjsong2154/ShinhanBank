/**
 * 인벤토리 데이터를 가져오는 커스텀 훅
 */
import { useState, useEffect } from "react";
import { API_URL } from "../api/config";

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  is_default: boolean;
  is_owned: boolean;
  acquired_at: string | null;
  created_at: string;
  acquisition_methods: Array<{
    type: string;
    description?: string;
    achievement?: {
      id: number;
      code: string;
      title: string;
      description: string;
      condition: {
        type: string;
        value: number;
      };
      is_unlocked: boolean;
    };
  }>;
}

export interface InventoryType {
  type_id: number;
  type_code: string;
  type_name: string;
  items: InventoryItem[];
}

export interface InventoryData {
  summary: {
    total_items: number;
    owned_items: number;
    completion_rate: string;
  };
  items_by_type: {
    character: InventoryType;
    outfit: InventoryType;
    hat: InventoryType;
  };
}

interface UseInventoryResult {
  data: InventoryData | null;
  loading: boolean;
  error: string | null;
}

const useInventory = (): UseInventoryResult => {
  const [data, setData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/users/inventory`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.inventory);
      } catch (err) {
        console.error("Inventory fetch error:", err);
        setError(err instanceof Error ? err.message : "인벤토리 데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return { data, loading, error };
};

export default useInventory;
