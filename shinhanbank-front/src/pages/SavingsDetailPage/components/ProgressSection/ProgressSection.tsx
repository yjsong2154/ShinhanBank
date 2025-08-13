import React from 'react';
import * as S from './ProgressSection.styles';
import Character from '../../../../components/Character/Character';
import useCharacter from '../../../../hooks/useCharacter';

interface ProgressSectionProps {
  currentAmount: number;
  targetAmount: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ currentAmount, targetAmount }) => {
  const { data: characterData, loading: characterLoading, error: characterError } = useCharacter();
  const remainingAmount = targetAmount - currentAmount;
  const progressPercentage = Math.round((currentAmount / targetAmount) * 100);

  if (characterLoading) {
    return <S.Container>캐릭터 정보를 불러오는 중...</S.Container>;
  }

  if (characterError || !characterData) {
    return <S.Container>캐릭터 정보를 불러오지 못했습니다.</S.Container>;
  }

  return (
    <S.Container>
      <S.Title>저축 진행률</S.Title>
      <S.ProgressGraphic>
        <Character
          characterUrl={characterData.characterUrl}
          backgroundUrl={characterData.backgroundUrl}
          clothesUrl={characterData.clothesUrl}
          accessoryUrl={characterData.accessoryUrl}
          progress={progressPercentage}
        />
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