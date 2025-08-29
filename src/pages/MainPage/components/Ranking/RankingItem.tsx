import React from "react";
import * as S from "./RankingItem.styles";

interface RankingItemProps {
  rank: number;
  name: string;
  amount: number;
  profileUrl?: string;
  isCrown?: boolean;
  rowIndex?: number;
}

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  name,
  amount,
  profileUrl,
  isCrown,
  rowIndex = 0,
}) => {
  // console.log("remain : ", profileUrl, isCrown);
  const striped = rowIndex % 2 === 0;
  return (
    <S.Container $striped={striped}>
      <S.Rank>{rank}</S.Rank>
      {/* {profileUrl && <S.ProfileImage src={profileUrl} alt={`${name} 프로필`} />} */}
      <S.Name>{name}</S.Name>
      <S.Amount>₩{amount.toLocaleString()}</S.Amount>
      {/* {isCrown && <S.CrownIcon src="/icons/crown.svg" alt="왕관" />} */}
    </S.Container>
  );
};

export default RankingItem;
