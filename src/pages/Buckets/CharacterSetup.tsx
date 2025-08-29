// 파일 목적: 적금통 캐릭터 설정/꾸미기 단계의 빈 페이지(추후 컴포넌트 삽입 예정)
// 주요 기능: 상단 헤더, 간단 안내 텍스트, 다음 버튼으로 최종 확인 페이지로 이동
// 주의사항: 전달된 state를 그대로 다음 페이지로 넘깁니다.

import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { useLocation, useNavigate } from "react-router-dom";

type AnyState = Record<string, unknown> | null | undefined;

const CharacterSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingState = (location.state as AnyState) || {};

  const handleNext = () => {
    // 다음 단계로 기존 state를 그대로 전달
    navigate("/buckets/final-confirm", { state: incomingState });
  };

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>캐릭터 설정</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Body>
        <Placeholder>캐릭터 꾸미기 컴포넌트를 여기에 추가할 예정입니다.</Placeholder>
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

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
`;

const TopTitle = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);
`;

const Placeholder = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 14px;
`;

const Bottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
`;

const NextButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;


