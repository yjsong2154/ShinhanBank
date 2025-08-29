import useFetch from "./useFetch";
import apiClient from "../api/apiClient";
import { API_URL } from "../api/config";
import { fetchUserById, type User } from "./useUserInfo";

// ... (기존 MajorRanking, UniversityRanking, RankingData 인터페이스는 그대로 유지) ...

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
    // 사용자 정보 추가
    user?: User;
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


const fetchRankingWithUserDetails = async (category: 'university' | 'major'): Promise<RankingData> => {
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
    
    const rankingData: RankingData = await response.json();

    // 'major' 랭킹일 경우에만 사용자 정보 추가
    if (category === 'major' && rankingData.ranking.majors) {
        const majorsWithUsers = await Promise.all(
            rankingData.ranking.majors.map(async (major) => {
                // 랭킹 데이터에 사용자 ID가 있다고 가정합니다. (API 명세 확인 필요)
                // 만약 participant_count가 사용자 ID 목록이라면 아래와 같이 수정
                // const userIds = major.participant_ids; 
                // 여기서는 participant_count를 임시로 user id로 사용합니다.
                try {
                    const user = await fetchUserById(major.participant_count);
                    return { ...major, user };
                } catch (error) {
                    console.error(`Failed to fetch user info for major ${major.major_name}:`, error);
                    // 사용자 정보 가져오기 실패 시 user 필드 없이 반환
                    return major;
                }
            })
        );
        rankingData.ranking.majors = majorsWithUsers;
    }

    return rankingData;
};

const useRanking = (category: 'university' | 'major') => {
    return useFetch<RankingData>(() => fetchRankingWithUserDetails(category), [category]);
};

export default useRanking;
