// src/components/RankingItem/RankingItem.tsx

import React from "react";
import * as S from "./RankingItem.styles";
import { getUniversityLogo } from "../../../../utils/university";

// 1. Props 인터페이스를 실제 사용하는 props와 일치시킵니다.
interface RankingItemProps {
  rank: number;
  name: string;
  amount: number;
  crown?: boolean;   // ✅ 왕관 여부
}

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  name,
  amount,
  universityId,
  isMe,
  rowIndex = 0,
}) => {
  const striped = rowIndex % 2 === 0;

  // 2. Container에 isMe prop을 전달하여 내 순위일 때 다른 스타일을 적용합니다.
  return (
    <S.Container $striped={striped} $isMe={isMe}>
      <S.Rank>{rank}</S.Rank>

      <S.LogoWrapper>
        {/* 3. 대학 로고 이미지 태그 주석을 해제합니다. */}
        <img
          src={getUniversityLogo(universityId)}
          alt={`${name} 로고`}
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 대체
            (e.currentTarget as HTMLImageElement).src = "/images/university/default.png";
          }}
        />
      </S.LogoWrapper>

      <S.Name>{name}</S.Name>
      <S.Amount>
        {amount.toLocaleString()}점
        {/* 4. 1위일 때 왕관 아이콘을 표시합니다. */}
        {rank === 1 && <S.CrownIcon src="/icons/crown.png" alt="1위" />}
      </S.Amount>
    </S.Container>
  );
};

export default RankingItem;