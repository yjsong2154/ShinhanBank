import { useNavigate } from "react-router-dom";
import Character from "../../../../components/Character/Character";
import useSavings from "../../../../hooks/useSavings";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import * as S from "./MySavingsList.styles";

type WithSocial = {
  likes?: number;
  comments?: number;
  updated_at_text?: string;
};

const MySavingsList = () => {
  const { data: savings, loading, error } = useSavings();
  const navigate = useNavigate();

  console.log("Savings data:", savings);

  const handleCreateSavings = () => navigate("/buckets/fixed");

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <S.EmptyMessage>
        적금 정보를 불러오는 중 오류가 발생했습니다.
      </S.EmptyMessage>
    );

  return (
    <S.Container>
      <S.Title>적금통 목록</S.Title>

      <S.SavingsList>
        {savings && savings.length > 0 ? (
          savings.map((item) => {
            const currentAmount =
              (item.current_progress / 100) * item.target_amount;

            // 타입 가드: 소셜 필드가 있으면 사용
            const hasUpdatedText = "updated_at_text" in (item as WithSocial);
            const hasLikes = "likes" in (item as WithSocial);
            const hasComments = "comments" in (item as WithSocial);

            const updatedText = hasUpdatedText
              ? (item as WithSocial).updated_at_text
              : undefined;

            const likes = hasLikes
              ? (item as WithSocial).likes ?? 0
              : undefined;
            const comments = hasComments
              ? (item as WithSocial).comments ?? 0
              : undefined;

            return (
              <S.SavingsItem to={`/savings/${item.id}`} key={item.id}>
                {/* 상단: 캐릭터 + 이름/시간 · 상태/리액션 */}
                <S.Header>
                  <S.LeftMeta>
                    <S.Avatar>
                      <Character character={parseInt(item.character.character_item.id)} cloth={parseInt(item.character.outfit_item.id)} hat={parseInt(item.character.hat_item.id)} />
                    </S.Avatar>
                    <div>
                      <S.Name>{item.name}</S.Name>
                      {updatedText && <S.Time>{updatedText}</S.Time>}
                    </div>
                  </S.LeftMeta>

                  <S.RightMeta>
                    {/* ✅ 좋아요/댓글은 항상 출력, 값 없으면 0 */}
                    <S.Reactions>
                      <S.Reaction>
                        <img src="/icons/like_icon_empty.svg" alt="likes" />
                        {item.likes ?? 0}
                      </S.Reaction>
                      <S.Reaction>
                        <img src="/icons/comment_icon.svg" alt="comments" />
                        {item.comments ?? 0}
                      </S.Reaction>
                    </S.Reactions>
                    <S.Status $isCompleted={item.status === "SUCCESS"}>
                      {item.status === "SUCCESS" ? "완료" : "진행중"}
                    </S.Status>
                  </S.RightMeta>
                </S.Header>

                {/* 설명 */}
                {item.description && <S.Desc>{item.description}</S.Desc>}

                {/* 금액 */}
                <S.AmountInfo>
                  <S.CurrentAmount>
                    ₩{currentAmount.toLocaleString()}
                  </S.CurrentAmount>
                  <S.TargetAmount>
                    / ₩{item.target_amount.toLocaleString()}
                  </S.TargetAmount>
                </S.AmountInfo>

                {/* 진행바 + % + 기간 */}
                <S.ProgressRow>
                  <S.ProgressBar>
                    <S.Progress $progress={item.current_progress} />
                    <S.PercentLabel>{item.current_progress}%</S.PercentLabel>
                  </S.ProgressBar>
                  <S.Period>{item.subscription_period}일</S.Period>
                </S.ProgressRow>
              </S.SavingsItem>
            );
          })
        ) : (
          <S.EmptyMessage>진행중인 적금이 없습니다.</S.EmptyMessage>
        )}
      </S.SavingsList>

      <S.NewButton onClick={handleCreateSavings}>
        + 새 적금통 만들기
      </S.NewButton>
    </S.Container>
  );
};

export default MySavingsList;
