// ChallengePage/components/AchievementItem/AchievementItem.tsx
import React from "react";
import type { Achievement } from "../../../../hooks/useAchievements";
import * as S from "./AchievementItem.styles";
import Character from "../../../../components/Character/Character";
import { getRewardImage } from "../../../../utils/character";

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <S.Container isCompleted={achievement.is_completed}>
      <S.Row>
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

        <S.RightCol>
          {achievement.reward_items.map((item) => {
            // 하드코딩 매핑: item_name(또는 item_code)이면 충분
            const thumb =
              getRewardImage((item as any).item_code) ||
              getRewardImage(item.item_name);

            return (
              <S.RewardCard
                key={item.item_id}
                $isCompleted={achievement.is_completed}
              >
                <S.RewardCharacter $isCompleted={achievement.is_completed}>
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item.item_name}
                      onError={(e) => {
                        // 이미지 못 찾으면 캐릭터로 폴백(또는 숨김)
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <Character id="0" />
                  )}
                </S.RewardCharacter>
                <S.RewardName $isCompleted={achievement.is_completed}>
                  {item.item_name}
                </S.RewardName>
                {achievement.is_completed && (
                  <S.CompletedBadge>달성 완료</S.CompletedBadge>
                )}
              </S.RewardCard>
            );
          })}
        </S.RightCol>
      </S.Row>
    </S.Container>
  );
};

export default AchievementItem;
