/**
 * 업적 달성 모달 컴포넌트. 메시지, 업적 제목, 보상 아이템명을 표시합니다.
 */
import React from 'react';
import * as S from './AchievementModal.styles';

interface AchievementModalProps {
  isOpen: boolean;
  message: string;
  title: string;
  itemName: string;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, message, title, itemName, onClose }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.Title>{message}</S.Title>
        <S.SubTitle>{title}</S.SubTitle>
        <S.RewardLabel>보상</S.RewardLabel>
        <S.RewardName>{itemName}</S.RewardName>
        <S.Button onClick={onClose}>확인</S.Button>
      </S.Container>
    </S.Overlay>
  );
};

export default AchievementModal;


