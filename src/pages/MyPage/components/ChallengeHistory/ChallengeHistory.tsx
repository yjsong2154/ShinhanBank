import TabComponent from '../../../../components/Tab/TabComponent';
import { myPageData } from '../../../../api/mockData';
import * as S from './ChallengeHistory.styles';

const ChallengeHistory = () => {
  const inProgressList = myPageData.challengeHistory.inProgress.map(item => (
    <S.ChallengeItem key={item.id}>
      <S.ChallengeInfo>
        <S.Title>{item.title}</S.Title>
        <S.Progress>{item.progress}% 진행</S.Progress>
      </S.ChallengeInfo>
      <S.ChallengeStatus>
        <S.Period>{item.period}</S.Period>
        <S.Reward>{item.reward}</S.Reward>
      </S.ChallengeStatus>
    </S.ChallengeItem>
  ));

  const completedList = myPageData.challengeHistory.completed.map(item => (
    <S.ChallengeItem key={item.id}>
      <S.ChallengeInfo>
        <S.Title>{item.title}</S.Title>
        <S.Progress>{item.progress}% 진행</S.Progress>
      </S.ChallengeInfo>
      <S.ChallengeStatus>
        <S.Period>완료</S.Period>
        <S.Reward>{item.reward}</S.Reward>
      </S.ChallengeStatus>
    </S.ChallengeItem>
  ));

  const tabs = [
    { name: `진행중 (${myPageData.challengeHistory.inProgress.length})`, component: <S.ChallengeList>{inProgressList}</S.ChallengeList> },
    { name: `완료 (${myPageData.challengeHistory.completed.length})`, component: <S.ChallengeList>{completedList}</S.ChallengeList> },
  ];

  return (
    <S.Container>
      <S.BigTitle>챌린지 기록</S.BigTitle>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default ChallengeHistory;