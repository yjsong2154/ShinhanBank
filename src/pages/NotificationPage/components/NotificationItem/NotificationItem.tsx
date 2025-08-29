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

const OPEN_THRESHOLD = 64; // px: 이 이상 스와이프하면 삭제 버튼 고정 노출
const MAX_SWIPE = 88; // px: 삭제 버튼 너비와 동일

const NotificationItem: React.FC<NotificationItemProps> = ({ id, type, title, message, createdAt, onDelete }) => {
  const startXRef = useRef<number | null>(null);
  const baseXRef = useRef<number>(0); // 드래그 시작 시점의 기준 위치(열림 상태면 -MAX_SWIPE, 아니면 0)
  const [translateX, setTranslateX] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // 드래그 시작: 기준 좌표와 기준 위치를 저장
    startXRef.current = e.touches[0].clientX;
    baseXRef.current = isOpen ? -MAX_SWIPE : 0;
    setIsDragging(true);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (startXRef.current === null) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    // 기준 위치에 델타를 더해 -MAX_SWIPE ~ 0 범위로 고정
    const nextX = Math.min(0, Math.max(-MAX_SWIPE, baseXRef.current + deltaX));
    setTranslateX(nextX);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    // 열거나 닫기 스냅 결정
    if (translateX <= -OPEN_THRESHOLD) {
      setIsOpen(true);
      setTranslateX(-MAX_SWIPE);
    } else if (translateX >= -OPEN_THRESHOLD / 2) {
      // 임계치 미만이면 닫기 쪽으로 스냅
      setIsOpen(false);
      setTranslateX(0);
    } else {
      setTranslateX(isOpen ? -MAX_SWIPE : 0);
    }
    startXRef.current = null;
    setIsDragging(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <S.Container onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <S.DeleteAction onClick={handleDeleteClick}>삭제</S.DeleteAction>
      <S.SwipeContent style={{ transform: `translateX(${translateX}px)`, transition: isDragging ? 'none' : 'transform 170ms cubic-bezier(0.2, 0, 0.2, 1)' }}>
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