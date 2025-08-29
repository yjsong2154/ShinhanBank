// RankingStage.tsx
import React from "react";
import Character from "../../../../components/Character/Character";
import * as S from "./RankingStage.styles";

export interface RankingRow {
  rank: number;
  name: string;
  amount: number;
  profileUrl?: string;
}
interface Props {
  top3: RankingRow[];
}

const RankingStage: React.FC<Props> = ({ top3 }) => {
  const byRank: Record<number, RankingRow | undefined> = {};
  top3.forEach((i) => (byRank[i.rank] = i));

  // 2-1-3 순서로 배치
  const podium = [byRank[2], byRank[1], byRank[3]].filter(
    Boolean
  ) as RankingRow[];

  return (
    <S.Wrap>
      {podium.map(({ rank, name }) => (
        <S.Item key={rank} first={rank === 1}>
          <S.Avatar first={rank === 1}>
            <Character id="0" />
            <S.Badge>{rank}</S.Badge>
          </S.Avatar>
          <S.Name>{name}</S.Name>
        </S.Item>
      ))}
    </S.Wrap>
  );
};

export default RankingStage;
