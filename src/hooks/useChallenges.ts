import useFetch from "./useFetch";
import apiClient from "../api/apiClient";
import { API_URL } from "../api/config";

export interface RewardItem {
    name: string;
    image_url: string;
}

export interface Challenge {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: 'active' | 'inactive';
    reward_item: RewardItem;
    participants: number;
    total_days: number;
    current_day: number;
}

const fetchChallenges = async (): Promise<Challenge[]> => {
    const response = await apiClient(`${API_URL}/challenge`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("챌린지 목록을 불러오는 데 실패했습니다.");
    }
    return response.json();
};

const useChallenges = () => {
    return useFetch<Challenge[]>(() => fetchChallenges(), []);
};

export default useChallenges;
