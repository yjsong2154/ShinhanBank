/**
 * 전역 업적 달성 이벤트를 구독하여 모달을 표시하는 호스트 컴포넌트입니다.
 */
import React, { useEffect, useState } from 'react';
import AchievementModal from './AchievementModal';
import { ACHIEVEMENT_EVENT } from '../../utils/achievementEvent';
import type { AchievementPayload, AchievementUnlockedEvent } from '../../utils/achievementEvent';

const AchievementModalHost: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<AchievementPayload | null>(null);

  useEffect(() => {
    // 업적 이벤트 수신 시 모달을 오픈
    const handler = (e: Event) => {
      const evt = e as AchievementUnlockedEvent;
      setPayload(evt.detail);
      setOpen(true);
    };
    window.addEventListener(ACHIEVEMENT_EVENT, handler as EventListener);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, handler as EventListener);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

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


