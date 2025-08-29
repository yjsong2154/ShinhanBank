import { useEffect, useState } from 'react';
import useAchievements from '../../hooks/useAchievements';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import * as S from './ChallengePage.styles';
import AchievementItem from './components/AchievementItem/AchievementItem';

const ChallengePage = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);

  const { data: achievementsData, loading, error } = useAchievements(userId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!achievementsData) {
    return <div>업적 데이터를 불러올 수 없습니다.</div>;
  }

  const { user, stats, achievements } = achievementsData;

  return (
    <S.Container>
      <S.Header>
        <S.Title>나의 업적</S.Title>
      </S.Header>
      <S.StatsContainer>
        <p>{user.nickname}님의 달성률: {stats.completion_rate}%</p>
        <p>({stats.completed_achievements} / {stats.total_achievements})</p>
      </S.StatsContainer>
      <S.AchievementList>
        {achievements.map((achievement) => (
          <AchievementItem key={achievement.achievement_id} achievement={achievement} />
        ))}
      </S.AchievementList>
    </S.Container>
  );
};

export default ChallengePage;
