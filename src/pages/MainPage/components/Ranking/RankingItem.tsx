// src/components/RankingItem/RankingItem.tsx

import React from "react";
import * as S from "./RankingItem.styles";
import DeptOrUnivIcon from "./DeptOrUnivIcon";

// 1. Props 인터페이스를 실제 사용하는 props와 일치시킵니다.
interface RankingItemProps {
  rank: number;
  name: string;
  amount: number;
  crown?: boolean;   // ✅ 왕관 여부
  rowIndex?: number; // 줄무늬 배경을 위한 인덱스
}

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  name,
  amount,
  crown = false,
  rowIndex = 0,
}) => {
  const striped = rowIndex % 2 === 0;

  // 2. Container에 isMe prop을 전달하여 내 순위일 때 다른 스타일을 적용합니다.
  return (
    <S.Container $striped={striped} $isMe={crown}>
      <S.Rank>{rank}</S.Rank>

      <S.LogoWrapper>
        <DeptOrUnivIcon name={name} size={40} />
      </S.LogoWrapper>

      <S.Name>{name}</S.Name>
      <S.Amount>
        {amount.toLocaleString()}점
      </S.Amount>
    </S.Container>
  );
};

export default RankingItem;