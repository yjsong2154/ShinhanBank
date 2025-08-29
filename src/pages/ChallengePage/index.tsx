import TabComponent from '../../components/Tab/TabComponent';
import ChallengeItem from './components/ChallengeItem/ChallengeItem';
import { challengePageData } from '../../api/mockData';
import * as S from './ChallengePage.styles';

const ChallengePage = () => {
  const inProgressList = challengePageData.inProgress.map((item) => (
    <ChallengeItem key={item.id} {...item} />
  ));
  const completedList = challengePageData.completed.map((item) => (
    <ChallengeItem key={item.id} {...item} />
  ));

  const tabs = [
    { name: `진행중 (${inProgressList.length})`, component: inProgressList },
    { name: `완료 (${completedList.length})`, component: completedList },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>챌린지</S.Title>
      </S.Header>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default ChallengePage;