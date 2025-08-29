import React, { useRef, useState } from 'react';
import * as S from './NotificationItem.styles'

interface NotificationItemProps {
  id: number;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  onDelete: (id: number) => void;
}

const SWIPE_THRESHOLD = 80; // px

const NotificationItem: React.FC<NotificationItemProps> = ({ id, type, title, message, createdAt, onDelete }) => {
  const startXRef = useRef<number | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (startXRef.current === null) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    if (deltaX < 0) {
      setTranslateX(Math.max(deltaX, -120));
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (translateX <= -SWIPE_THRESHOLD) {
      onDelete(id);
    }
    setTranslateX(0);
    startXRef.current = null;
  };

  return (
    <S.Container onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <S.DeleteBackground>삭제</S.DeleteBackground>
      <S.SwipeContent style={{ transform: `translateX(${translateX}px)`, transition: 'transform 120ms ease-out' }}>
        <S.TitleWrapper>
          <S.Title>{title}</S.Title>
          <S.Type>{type}</S.Type>
        </S.TitleWrapper>
        <S.Content>{message}</S.Content>
        <S.Date>{createdAt}</S.Date>
      </S.SwipeContent>
    </S.Container>
  );
};

export default NotificationItem;