// 파일 목적: 사용자 닉네임 변경 API 호출 유틸리티
import apiClient from './apiClient';
import { API_URL } from './config';

interface UpdateNicknameRequest {
  nickname: string;
}

interface UpdateNicknameResponse {
  message: string;
  nickname: string;
}

export const updateNickname = async (nickname: string): Promise<UpdateNicknameResponse> => {
  // 세션 인증 토큰이 필요한 엔드포인트와의 일관성을 위해 기존 패턴 재사용
  const token = sessionStorage.getItem('token');

  const response = await apiClient(`${API_URL}/users/nickname`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ nickname } satisfies UpdateNicknameRequest),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `닉네임 변경 실패: ${response.status}`);
  }

  const data: UpdateNicknameResponse = await response.json();
  return data;
};

export type { UpdateNicknameRequest, UpdateNicknameResponse };


