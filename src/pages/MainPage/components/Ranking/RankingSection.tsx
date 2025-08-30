import { useEffect } from 'react';
import useRanking from '../../../../hooks/useRanking';
import TabComponent from "../../../../components/Tab/TabComponent";
import RankingStage from "./RankingStage";
import RankingItem from "./RankingItem";
import * as S from "./RankingSection.styles";
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

type Row = { rank: number; name: string; amount: number; crown?: boolean };

// 정렬 + 6위 제한
function clampTop6(list: Row[]): Row[] {
  return [...list].sort((a, b) => a.rank - b.rank).slice(0, 6);
}

// majorData → Row[]
function majorsToRows(majorData: any): Row[] {
  const majors = majorData?.ranking?.majors ?? [];
  const rows = majors.map((m: any) => ({
    rank: Number(m.ranking_position),
    name: String(m.major_name),
    amount: Number(m.total_score ?? 0),
  }));
  return clampTop6(rows);
}

// universityData → Row[]
function universitiesToRows(universityData: any): Row[] {
  const universities = universityData?.ranking?.universities ?? [];
  const rows = universities.map((uni: any, index: number) => ({
    rank: Number(uni.ranking_position ?? index + 1),
    name: String(uni.university_name),
    amount: Number(uni.total_score ?? 0),
  }));
  return clampTop6(rows);
}

// 내 대학을 6위 리스트에 주입(또는 왕관만 표시)
function injectMyUniversity(
  top6Rows: Row[],
  allUniversities: any[],             // universityData.ranking.universities
  myUniId?: number,
  myUniName?: string
): Row[] {
  if (!Array.isArray(allUniversities) || (!myUniId && !myUniName)) return top6Rows;

  const myUni = allUniversities.find((u: any) =>
    (myUniId && u.university_id === myUniId) ||
    (myUniName && u.university_name === myUniName)
  );
  if (!myUni) return top6Rows;

  const myRow: Row = {
    rank: Number(myUni.ranking_position ?? 0),
    name: String(myUni.university_name),
    amount: Number(myUni.total_score ?? 0),
    crown: true,
  };

  // 6위 안에 이미 있다면 → 그 항목에 crown만 켜기
  const idxInTop6 = top6Rows.findIndex(r => r.name === myRow.name);
  if (idxInTop6 >= 0) {
    const copy = [...top6Rows];
    copy[idxInTop6] = { ...copy[idxInTop6], crown: true };
    return copy;
  }

  // 6위 밖이라면 → 6위 자리를 내 대학으로 교체
  const replaced = [...top6Rows];
  if (replaced.length === 6) {
    replaced[5] = myRow; // 마지막 자리를 교체
  } else {
    replaced.push(myRow);
  }
  // 교체 후에도 순서(1~6)가 중요한 경우 정렬은 유지
  return replaced.sort((a, b) => a.rank - b.rank).slice(0, 6);
}

function injectMyMajor(
  top6Rows: Row[],
  allMajors: any[] | undefined,
  myMajor?: {
    major_id?: number;
    major_name?: string;
    ranking_position?: number;
    total_score?: number;
  }
): Row[] {
  if (!Array.isArray(allMajors) || !myMajor) return top6Rows;

  // 전체 랭킹 배열에서 내 전공 항목 찾기 (정확한 스펙 사용)
  const found = allMajors.find((m: any) =>
    (myMajor.major_id && m.major_id === myMajor.major_id) ||
    (myMajor.major_name && m.major_name === myMajor.major_name)
  );

  // found가 있으면 그 값을 우선 사용, 없으면 myMajor 정보를 사용
  const rank = Number(found?.ranking_position ?? myMajor.ranking_position ?? 0);
  const name = String(found?.major_name ?? myMajor.major_name ?? "");
  const amount = Number(found?.total_score ?? myMajor.total_score ?? 0);

  if (!name) return top6Rows; // 이름 없으면 주입 불가

  const myRow: Row = { rank, name, amount, crown: true };

  // 6위 안에 이미 있으면 왕관만 켜기
  const idxInTop6 = top6Rows.findIndex(r => r.name === myRow.name);
  if (idxInTop6 >= 0) {
    const copy = [...top6Rows];
    copy[idxInTop6] = { ...copy[idxInTop6], crown: true };
    return copy;
  }

  // 6위 밖이면 6위 항목을 내 전공으로 교체
  const replaced = [...top6Rows];
  if (replaced.length === 6) {
    replaced[5] = myRow;
  } else {
    replaced.push(myRow);
  }

  // 실제 순위를 표시해야 하므로 rank 기준 정렬 후 6개 유지
  return replaced
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 6);
}

const splitTop3 = (list: Row[]) => {
  const sortedTop6 = [...list].sort((a, b) => a.rank - b.rank).slice(0, 6);
  return {
    top3: sortedTop6.slice(0, 3),
    others: sortedTop6.slice(3), // 4~6위만
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
  const { data: universityData, loading: universityLoading, error: universityError } = useRanking('university');
  const { data: majorData,      loading: majorLoading,      error: majorError }      = useRanking('major');

  useEffect(() => {
    console.log('Ranking Data:', universityData);
    console.log('Loading:', universityLoading);
    console.log('Error:', universityError);
    console.log('Major Ranking Data:', majorData);
    console.log('Major Loading:', majorLoading);
    console.log('Major Error:', majorError);
  }, [universityData, universityLoading, universityError, majorData, majorLoading, majorError]);

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

 // ✅ 실제 데이터 변환
  const majorRows: Row[] = majorsToRows(majorData);

  // 대학 랭킹 raw 변환
  const uniRowsRaw: Row[] = universitiesToRows(universityData);

  // 내 대학 정보(가능한 소스 우선순위로 추출)
  const myUniId   = universityData?.target_university?.university_id
                 ?? majorData?.target_university?.university_id;
  const myUniName = universityData?.target_university?.university_name
                 ?? majorData?.target_university?.university_name;

  // 전체 대학 목록
  const allUniversities = universityData?.ranking?.universities ?? [];

  // 전체 전공 목록 & 내 전공
const allMajors = majorData?.ranking?.majors as any[] | undefined;
const myMajor   = majorData?.my_major as
  | { major_id:number; major_name:string; ranking_position:number; total_score:number }
  | undefined;

// ✅ 내 전공 주입/왕관 처리
const majorRowsWithMine: Row[] = injectMyMajor(majorRows, allMajors, myMajor);

  // ✅ 내 대학 주입/왕관처리
  const uniRowsWithMine: Row[] = injectMyUniversity(uniRowsRaw, allUniversities, myUniId, myUniName);

  const tabs = [
    { name: "학과 랭킹",  component: renderRankingCard(majorRowsWithMine) },
    { name: "대학 랭킹",  component: renderRankingCard(uniRowsWithMine) },
  ];

  return (
    <S.Container>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};


export default RankingSection;
