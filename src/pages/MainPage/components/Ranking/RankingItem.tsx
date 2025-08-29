import React from "react";
import * as S from "./RankingItem.styles";
import { getUniversityLogo } from "../../../../utils/university";

interface RankingItemProps {
  rank: number;
  name: string;
  amount: number;
  universityId?: number;
  rowIndex?: number;
}

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  name,
  amount,
  universityId,
  rowIndex = 0,
}) => {
  const striped = rowIndex % 2 === 0;

  return (
    <S.Container $striped={striped}>
      <S.Rank>{rank}</S.Rank>

      <S.LogoWrapper>
        {/* <img
          src={getUniversityLogo(universityId)}
          alt={`${name} 로고`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/university/default.png";
          }}
        /> */}
      </S.LogoWrapper>

      <S.Name>{name}</S.Name>
      <S.Amount>{amount.toLocaleString()}점</S.Amount>
    </S.Container>
  );
};

export default RankingItem;
