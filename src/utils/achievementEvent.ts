/**
 * 업적 달성 이벤트 디스패치/구독 유틸리티를 제공합니다.
 */

// 업적 달성 이벤트명은 전역에서 공유됩니다.
export const ACHIEVEMENT_EVENT = 'achievement_unlocked';

// 업적 모달에 필요한 최소 페이로드 형태
export interface AchievementPayload {
  message: string;
  title: string;
  itemName: string;
  // 원본 응답이 필요한 경우를 대비해 보관
  raw?: unknown;
  // 알림 기반인 경우 읽음 처리를 위한 알림 ID
  notificationId?: number;
}

// 커스텀 이벤트 타입 정의
export interface AchievementUnlockedEvent extends CustomEvent<AchievementPayload> {
  type: typeof ACHIEVEMENT_EVENT;
}

/**
 * 업적 달성 이벤트를 전역으로 브로드캐스트합니다.
 */
export const dispatchAchievementUnlocked = (payload: AchievementPayload): void => {
  // 런타임에서 안전하게 이벤트를 발생
  const event: AchievementUnlockedEvent = new CustomEvent(ACHIEVEMENT_EVENT, {
    detail: payload,
  }) as AchievementUnlockedEvent;
  window.dispatchEvent(event);
};


