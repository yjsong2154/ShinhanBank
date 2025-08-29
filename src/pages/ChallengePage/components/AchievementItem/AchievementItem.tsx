import React from 'react';
import type { Achievement } from '../../../../hooks/useAchievements';
import * as S from './AchievementItem.styles';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <S.Container isCompleted={achievement.is_completed}>
      <S.Title>{achievement.title}</S.Title>
      <S.Description>{achievement.description}</S.Description>
      <S.RewardContainer>
        {achievement.reward_items.map(item => (
          <S.RewardBox key={item.item_id}>
            <S.RewardName>{item.item_name}</S.RewardName>
          </S.RewardBox>
        ))}
      </S.RewardContainer>
      {achievement.is_completed && <S.CompletedLabel>달성 완료</S.CompletedLabel>}
    </S.Container>
  );
};

export default AchievementItem;
