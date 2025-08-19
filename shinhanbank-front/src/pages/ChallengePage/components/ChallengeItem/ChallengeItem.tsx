import React from 'react';
import * as S from './ChallengeItem.styles';

interface ChallengeItemProps {
  title: string;
  description: string;
  participants: number;
  period: string;
  reward: string;
  imageUrl: string;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({
  title,
  description,
  participants,
  period,
  reward,
  imageUrl,
}) => {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={title} />
      <S.ContentWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.InfoWrapper>
          <S.Participants>참여자 {participants.toLocaleString()}명</S.Participants>
          <S.Period>{period}</S.Period>
        </S.InfoWrapper>
        <S.Reward>💰 보상: {reward}</S.Reward>
      </S.ContentWrapper>
      <S.Button>참여하기</S.Button>
    </S.Container>
  );
};

export default ChallengeItem;