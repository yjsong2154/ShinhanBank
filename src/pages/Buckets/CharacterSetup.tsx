// 파일 목적: 적금통 캐릭터 설정/꾸미기 단계
// 주요 기능: 캐릭터 꾸미기, 다음 버튼으로 최종 확인 페이지로 이동
// 주의사항: 전달된 state에 캐릭터 정보를 추가하여 다음 페이지로 넘깁니다.

import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import InventoryForSaving from "../SavingsSettingsPage/inventory";
import useUserInfo from "../../hooks/useUserInfo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

type AnyState = Record<string, unknown> | null | undefined;

const CharacterSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingState = (location.state as AnyState) || {};
  const userId = sessionStorage.getItem("user_id");
  const { data: user, loading, error } = useUserInfo(userId || "");

  const [characterItemId, setCharacterItemId] = useState<number | null>(null);
  const [outfitItemId, setOutfitItemId] = useState<number | null>(null);
  const [hatItemId, setHatItemId] = useState<number | null>(null);

  const handleSelectionChange = (selection: { character: number | null; outfit: number | null; hat: number | null }) => {
    setCharacterItemId(selection.character);
    setOutfitItemId(selection.outfit);
    setHatItemId(selection.hat);
  };

  const handleNext = () => {
    const nextState = {
      ...incomingState,
      character_item_id: characterItemId !== null ? characterItemId : user?.character.character_item.id,
      outfit_item_id: outfitItemId !== null ? outfitItemId : user?.character.outfit_item.id,
      hat_item_id: hatItemId !== null ? hatItemId : user?.character.hat_item.id,
    };
    navigate("/buckets/final-confirm", { state: nextState });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>캐릭터 설정</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Body>
        <InventoryForSaving 
          onSelectionChange={handleSelectionChange} 
          initialCharacter={user.character}
        />
      </Body>

      <Bottom>
        <NextButton onClick={handleNext}>다음</NextButton>
      </Bottom>
    </Container>
  );
};

export default CharacterSetup;

// 스타일
const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 12px 16px 80px;
  box-sizing: border-box;
`;
const TopTitle = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 4px;  /* 여백을 충분히 추가 */
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);  /* 상단 바의 높이와 Bottom 영역을 제외한 콘텐츠 크기 */
  margin-top: 24px;  /* 캐릭터 설정이 위에 붙지 않게 여백 추가 */
`;

const Bottom = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
`;

const NextButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #9a77ff;
  border-radius: 20px;
  background: #9a77ff;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.12s ease, filter 0.2s ease, box-shadow 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 14px rgba(154, 119, 255, 0.28),
      0 2px 6px rgba(154, 119, 255, 0.2);
    filter: brightness(1.03);
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 3px 8px rgba(154, 119, 255, 0.22);
  }

  &:disabled {
    background: #9a77ff;
    color: #fff;
    border-color: #9a77ff;
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;