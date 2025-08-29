import useFetch from './useFetch';
import { API_URL } from '../api/config';

// API 응답에 대한 타입 정의
interface University {
  id: number;
  name: string;
}

interface CharacterItem {
  id: number;
  name: string;
  description: string;
}

interface Character {
  character_item: CharacterItem;
  outfit_item: CharacterItem;
  hat_item: CharacterItem;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  created_at: string;
  university: University;
  character: Character;
}

interface UserApiResponse {
    message: string;
    user: User;
}

/**
 * 사용자 정보를 가져오는 비동기 함수
 * @param id 사용자 ID
 * @returns 사용자 정보
 */
const fetchUserInfo = async (): Promise<User> => {
  // API 명세에 따라 /users/{id} 형태로 요청
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    //   // 필요하다면 여기에 인증 토큰 등을 추가할 수 있습니다.
    // },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '사용자 정보를 불러오는 데 실패했습니다.');
  }

  const data: UserApiResponse = await response.json();
  return data.user;
};

/**
 * 사용자 정보를 가져오는 커스텀 훅
 * @param id 사용자 ID
 * @returns { data, loading, error }
 */
const useUserInfo = (id: string) => {
  // id가 유효할 때만 fetch 하도록 조건 추가
  const shouldFetch = id && id.trim().length > 0;

  // fetcher 함수를 람다로 감싸서 인자를 전달하고, id를 의존성 배열에 추가
  return useFetch<User | null>(
    () => (shouldFetch ? fetchUserInfo() : Promise.resolve(null)),
    [id]
  );
};

export default useUserInfo;
