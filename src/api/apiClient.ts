// 파일 목적: 공통 fetch 래퍼. 모든 요청에 인증 쿠키 포함을 기본값으로 설정합니다.
import { handleUnauthorized } from '../utils/auth';
import { dispatchAchievementUnlocked } from '../utils/achievementEvent.ts';

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

  // 202 응답 시 업적 달성 이벤트를 브로드캐스트하여 전역 모달을 띄움
  if (response.status === 202) {
    try {
      const cloned = response.clone();
      const data = await cloned.json().catch(() => null);
      // 백엔드가 업적 달성 타입을 명시하거나 achievements 필드가 존재하는 경우 처리
      const isAchievement = data && (data.type === 'achievement_unlocked' || data.achievements);
      if (isAchievement) {
        const first = data.achievements?.list?.[0] || data.achievements?.[0] || null;
        const title = first?.title || '';
        const rewardName = (first?.rewards?.[0]?.itemName)
          || (first?.reward_items?.[0]?.item_name)
          || '';
        const message = data.message || '축하합니다! 새로운 업적을 달성했습니다!';
        dispatchAchievementUnlocked({ message, title, itemName: rewardName, raw: data });
      }
    } catch {
      // 파싱 실패는 무시: 호출부의 본래 처리를 방해하지 않기 위함
    }
  }

  return response;
};

export default apiClient;