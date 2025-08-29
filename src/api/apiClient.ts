// 파일 목적: 공통 fetch 래퍼. 모든 요청에 인증 쿠키 포함을 기본값으로 설정합니다.
import { handleUnauthorized } from '../utils/auth';

const apiClient = async (url: string, options: RequestInit = {}) => {
  // 쿠키 기반 세션 전송을 위해 credentials 기본값을 include로 통일
  const merged: RequestInit = {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, merged);

  if (response.status === 401) {
    handleUnauthorized();
    return Promise.reject(new Error('Unauthorized'));
  }

  return response;
};

export default apiClient;