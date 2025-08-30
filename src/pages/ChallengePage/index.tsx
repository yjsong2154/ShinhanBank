import { useEffect, useState } from "react";
import useAchievements from "../../hooks/useAchievements";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import * as S from "./ChallengePage.styles";
import AchievementItem from "./components/AchievementItem/AchievementItem";

const ChallengePage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    setUserId(storedUserId);
  }, []);

  const { data: achievementsData, loading, error } = useAchievements(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!achievementsData) return <div>업적 데이터를 불러올 수 없습니다.</div>;

  const { user, stats, achievements } = achievementsData;

  // 안전 가드
  const rate = Math.max(0, Math.min(100, Number(stats?.completion_rate ?? 0)));

  return (
    <S.Container>
      <S.Header>
        <S.Title>나의 업적</S.Title>
      </S.Header>

      {/* ✅ 사용자 이름 있는 요약 박스 + 프로그래스바 */}
      <S.StatsContainer>
        <S.StatsHeader>
          <S.StatsTitle>
            {user.nickname}님의 달성률: {rate}%
          </S.StatsTitle>
          <S.StatsSub>
            ({stats.completed_achievements} / {stats.total_achievements})
          </S.StatsSub>
        </S.StatsHeader>

        <S.ProgressBar>
          <S.ProgressFill $progress={rate} />
          <S.PercentLabel>{rate}%</S.PercentLabel>
        </S.ProgressBar>
      </S.StatsContainer>

      <S.AchievementList>
        {achievements.map((achievement) => (
          <AchievementItem
            key={achievement.achievement_id}
            achievement={achievement}
          />
        ))}
      </S.AchievementList>
    </S.Container>
  );
};

export default ChallengePage;
