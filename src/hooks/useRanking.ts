import useFetch from "./useFetch";
import apiClient from "../api/apiClient";
import { API_URL } from "../api/config";

export interface MajorRanking {
    major_id: number;
    major_name: string;
    university_id: number;
    university_name: string;
    total_score: number;
    challenge_completion_rate: number;
    avg_success_rate: number;
    participant_count: string;
    active_challenge_buckets: string;
    completed_challenge_buckets: string;
    total_challenge_buckets: string;
    avg_target_amount: number;
    normalized_participants: number;
    normalized_avg_target: number;
    ranking_position: number;
}

export interface UniversityRanking {
    university_id: number;
    university_name: string;
    total_score: number;
    ranking_position: number;
}

export interface RankingData {
    category: string;
    message: string;
    target_university?: {
        university_id: number;
        university_name: string;
    };
    my_major?: {
        university_id: number;
        university_name: string;
        major_id: number;
        major_name: string;
        ranking_position: number;
        total_score: number;
    };
    ranking: {
        total_majors?: number;
        total_universities?: number; // For university ranking
        updated_at: string;
        methodology: {
            description: string;
            target: string;
            scope: string;
            weights: {
                [key: string]: string;
            };
        };
        majors?: MajorRanking[];
        universities?: UniversityRanking[];
    };
}

const fetchRanking = async (category: 'university' | 'major'): Promise<RankingData> => {
    const response = await apiClient(`${API_URL}/ranking/?category=${category}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("랭킹 정보를 불러오는 데 실패했습니다.");
    }
    return response.json();
};

const useRanking = (category: 'university' | 'major') => {
    return useFetch<RankingData>(() => fetchRanking(category), [category]);
};

export default useRanking;
