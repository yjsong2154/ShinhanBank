import TabComponent from '../../../../components/Tab/TabComponent';
import RankingItem from './RankingItem';
import { rankingData } from '../../../../api/mockData';
import * as S from './RankingSection.styles'

const RankingSection = () => {
  const friendRankingList = rankingData.friends.map(item => (
    <RankingItem key={item.rank} {...item} />
  ));
  const universityRankingList = rankingData.university.map(item => (
    <RankingItem key={item.rank} {...item} />
  ));
  const interUniversityRankingList = rankingData.interUniversity.map(item => (
    <RankingItem key={item.rank} {...item} />
  ));

  const tabs = [
    { name: '친구 랭킹', component: <S.RankingList>{friendRankingList}</S.RankingList> },
    { name: '우리 대학', component: <S.RankingList>{universityRankingList}</S.RankingList> },
    { name: '대학 간', component: <S.RankingList>{interUniversityRankingList}</S.RankingList> },
  ];

  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon>🟣</S.TitleIcon>
        랭킹
      </S.Title>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default RankingSection;