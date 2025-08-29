import useFetch from "./useFetch";
import apiClient from "../api/apiClient";
import { API_URL } from "../api/config";

export interface RewardItem {
    item_id: number;
    item_name: string;
    item_description: string;
    item_type_id: number;
    item_type_code: string;
    item_type_name: string;
    is_default: boolean;
}

export interface Achievement {
    achievement_id: number;
    code: string;
    title: string;
    description: string;
    condition: {
        type: string;
        value: number;
    };
    is_active: boolean;
    is_completed: boolean;
    unlocked_at: string | null;
    meta: unknown | null;
    achievement_created_at: string;
    reward_items: RewardItem[];
}

export interface AchievementsData {
    message: string;
    user: {
        user_id: number;
        nickname: string;
    };
    stats: {
        total_achievements: number;
        completed_achievements: number;
        completion_rate: string;
    };
    achievements: Achievement[];
}

const fetchAchievements = async (userId: string): Promise<AchievementsData> => {
    const response = await apiClient(`${API_URL}/achievement/?user_id=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("업적 목록을 불러오는 데 실패했습니다.");
    }
    return response.json();
};

const useAchievements = (userId: string | null) => {
    return useFetch<AchievementsData>(() => {
        if (!userId) {
            return Promise.reject(new Error("User ID is not provided."));
        }
        return fetchAchievements(userId);
    }, [userId]);
};

export default useAchievements;
