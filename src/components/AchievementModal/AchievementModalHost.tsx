/**
 * 전역 업적 달성 이벤트를 구독하여 모달을 표시하는 호스트 컴포넌트입니다.
 * 여러 건이 연속으로 도착할 경우 큐에 쌓아 순차적으로 노출합니다.
 */
import React, { useCallback, useEffect, useState } from 'react';
import AchievementModal from './AchievementModal';
import { ACHIEVEMENT_EVENT } from '../../utils/achievementEvent.ts';
import type { AchievementPayload, AchievementUnlockedEvent } from '../../utils/achievementEvent.ts';
import { readNotification } from '../../api/notifications';
import { dispatchNotificationsUpdated } from '../../utils/notificationEvent.ts';

const AchievementModalHost: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<AchievementPayload | null>(null);
  const [queue, setQueue] = useState<AchievementPayload[]>([]);

  useEffect(() => {
    // 업적 이벤트 수신 시 큐에 적재
    const handler = (e: Event) => {
      const evt = e as AchievementUnlockedEvent;
      setQueue((prev) => [...prev, evt.detail]);
    };
    window.addEventListener(ACHIEVEMENT_EVENT, handler as EventListener);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, handler as EventListener);
  }, []);

  // 큐 변경 시 표시할 항목이 없고 모달이 닫혀 있으면 다음 항목을 꺼냄
  useEffect(() => {
    if (!open && queue.length > 0) {
      const [next, ...rest] = queue;
      setPayload(next);
      setQueue(rest);
      setOpen(true);
    }
  }, [queue, open]);

  const handleClose = useCallback(async () => {
    // 모달 닫기 전에 알림 ID가 있으면 읽음 처리 요청
    if (payload?.notificationId != null) {
      try {
        await readNotification(payload.notificationId);
        // 알림 수 변경 이벤트를 브로드캐스트
        dispatchNotificationsUpdated();
      } catch {
        // 네트워크 오류 등은 사용자 흐름을 막지 않기 위해 무시
      }
    }
    setOpen(false);
    // 닫은 후 useEffect가 다음 항목을 자동으로 표시
  }, [payload]);

  return (
    <AchievementModal
      isOpen={open}
      message={payload?.message || ''}
      title={payload?.title || ''}
      itemName={payload?.itemName || ''}
      onClose={handleClose}
    />
  );
};

export default AchievementModalHost;


