import React from 'react';
import * as S from './ProgressSection.styles';
import Character from '../../../../components/Character/Character';

interface ProgressSectionProps {
  currentAmount: number;
  targetAmount: number;
  character: number;
  cloth: number;
  hat: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ currentAmount, targetAmount, character, cloth, hat}) => {
  const remainingAmount = targetAmount - currentAmount;

  return (
    <S.Container>
      <S.Title>저축 진행률</S.Title>
      <S.ProgressGraphic>
        <Character character={character} cloth={cloth} hat={hat} />
      </S.ProgressGraphic>
      <S.AmountInfo>
        <S.CurrentAmount>{currentAmount.toLocaleString()}원</S.CurrentAmount>
        <S.TargetAmount> / {targetAmount.toLocaleString()}원</S.TargetAmount>
      </S.AmountInfo>
      <S.RemainingAmount>
        목표까지 {remainingAmount.toLocaleString()}원 남았어요!
      </S.RemainingAmount>
    </S.Container>
  );
};

export default ProgressSection;