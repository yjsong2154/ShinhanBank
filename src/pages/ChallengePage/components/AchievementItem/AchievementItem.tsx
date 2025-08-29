import React from "react";
import type { Achievement } from "../../../../hooks/useAchievements";
import * as S from "./AchievementItem.styles";
import Character from "../../../../components/Character/Character";

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <S.Container isCompleted={achievement.is_completed}>
      <S.Row>
        {/* 왼쪽: 타이틀/설명 */}
        <S.LeftCol>
          <S.TopRow>
            <S.Title isCompleted={achievement.is_completed}>
              {achievement.title}
            </S.Title>
          </S.TopRow>
          {achievement.description && (
            <S.Description isCompleted={achievement.is_completed}>
              {achievement.description}
            </S.Description>
          )}
        </S.LeftCol>

        {/* 오른쪽: 캐릭터 카드 */}
        <S.RightCol>
          {achievement.reward_items.map((item) => (
            <S.RewardCard
              key={item.item_id}
              $isCompleted={achievement.is_completed}
            >
              <S.RewardCharacter $isCompleted={achievement.is_completed}>
                <Character id="0" />
              </S.RewardCharacter>
              <S.RewardName $isCompleted={achievement.is_completed}>
                {item.item_name}
              </S.RewardName>
              {achievement.is_completed && (
                <S.CompletedBadge>달성 완료</S.CompletedBadge>
              )}
            </S.RewardCard>
          ))}
        </S.RightCol>
      </S.Row>
    </S.Container>
  );
};

export default AchievementItem;
