/**
 * 알림 관련 전역 이벤트 유틸리티. 알림 읽음 처리 이후 UI 갱신을 요청합니다.
 */

export const NOTIFICATIONS_UPDATED = 'notifications_updated';

export const dispatchNotificationsUpdated = (): void => {
  const evt = new Event(NOTIFICATIONS_UPDATED);
  window.dispatchEvent(evt);
};


