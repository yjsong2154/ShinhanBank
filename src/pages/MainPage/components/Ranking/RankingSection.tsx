import { useEffect } from 'react';
import useRanking from '../../../../hooks/useRanking';
import TabComponent from "../../../../components/Tab/TabComponent";
import RankingStage from "./RankingStage";
import RankingItem from "./RankingItem";
import { rankingData } from "../../../../api/mockData";
import * as S from "./RankingSection.styles";
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

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
  const { data : universityData, loading : universityLoading, error : universityError } = useRanking('university');
  const { data : majorData, loading : majorLoading, error : majorError } = useRanking('major');

  useEffect(() => {
    console.log('Ranking Data:', universityData);
    console.log('Loading:', universityLoading);
    console.log('Error:', universityError);
    console.log('Major Ranking Data:', majorData);
    console.log('Major Loading:', majorLoading);
    console.log('Major Error:', majorError);
  }, [universityData, universityLoading, universityError, majorData, majorLoading, majorError]);

  // 2. 로딩 및 에러 상태 통합
  const isLoading = majorLoading || universityLoading;
  const error = majorError || universityError;

  if (isLoading) {
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.EmptyRow>데이터를 불러오는 중 오류가 발생했습니다.</S.EmptyRow>
      </S.Container>
    );
  }

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
