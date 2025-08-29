import { useEffect } from 'react';
import useRanking from '../../../../hooks/useRanking';
import TabComponent from "../../../../components/Tab/TabComponent";
import RankingStage from "./RankingStage";
import RankingItem from "./RankingItem";
import { rankingData } from "../../../../api/mockData";
import * as S from "./RankingSection.styles";

type Row = { rank: number; name: string; amount: number; profileUrl?: string };

const splitTop3 = (list: Row[]) => {
  const sorted = [...list].sort((a, b) => a.rank - b.rank);
  return {
    top3: sorted.slice(0, 3),
    others: sorted.filter((i) => i.rank > 3), // 4위 이상만
  };
};

const renderRankingCard = (list: Row[]) => {
  const { top3, others } = splitTop3(list);

  return (
    <S.RankingCard>
      <S.PodiumBar>
        <RankingStage top3={top3} />
      </S.PodiumBar>

      <S.ListPanel>
        {others.length > 0 ? (
          others.map((item, idx) => (
            <RankingItem key={item.rank} {...item} rowIndex={idx} />
          ))
        ) : (
          <S.EmptyRow>아직 4위 이후 데이터가 없습니다.</S.EmptyRow>
        )}
      </S.ListPanel>
    </S.RankingCard>
  );
};

const RankingSection = () => {
  const { data, loading, error } = useRanking('university');

  useEffect(() => {
    console.log('Ranking Data:', data);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [data, loading, error]);

  const tabs = [
    { name: "학과 랭킹", component: renderRankingCard(rankingData.department) },
    {
      name: "대학 랭킹",
      component: renderRankingCard(rankingData.interUniversity),
    },
  ];

  return (
    <S.Container>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default RankingSection;
