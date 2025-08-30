// 파일 목적: 개설 완료 화면. 축하 메시지, 요약 카드(유형/기간/만기일), 보조 액션 및 홈 이동.
// 주요 섹션: 완료 아이콘/메시지, 요약 카드, 보조 액션(공유/캘린더 placeholder), 홈 이동 버튼.
// 주의사항: 자유형일 경우 "바로 돈 넣기" 버튼 노출. 필요 시 진입 시 임시 상태 초기화.

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import type { ProductType } from "../../api/mockDataSavingProducts";

type IncomingState = {
  bucketId?: string;
  productType?: ProductType;
  periodDays?: number;
  amount?: number;
  executeTime?: string;
};

const Complete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as IncomingState;

  const type = state.productType || "fixed";
  const days = state.periodDays || 0;
  const start = useMemo(() => new Date(), []);
  const maturity = useMemo(() => {
    const d = new Date(start);
    d.setDate(d.getDate() + Math.max(days - 1, 0));
    return d;
  }, [start, days]);

  const fmt = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const handleHome = () => {
    // 필요 시 상태 초기화 (세션/컨텍스트 사용 시 여기에서 초기화)
    navigate("/");
  };

  // 보조 액션 제거로 인한 불필요 함수/변수 삭제

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>개설 완료</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Congrats>
        <CongratsTitle>축하합니다!</CongratsTitle>
        <SuccessImg src="/success.svg" alt="개설 완료" />
        <CongratsDesc>새 적금통이 성공적으로 개설되었습니다.</CongratsDesc>
      </Congrats>

      <Card>
        <Row>
          <Label>유형</Label>
          <Value>
            {type === "fixed"
              ? "적금(고정)"
              : type === "flexible"
              ? "적금(자유)"
              : "정기예금"}
          </Value>
        </Row>
        <Row>
          <Label>기간</Label>
          <Value>{days}일</Value>
        </Row>
        <Row>
          <Label>만기일</Label>
          <Value>{fmt(maturity)}</Value>
        </Row>
      </Card>

      {/* 자유형 "바로 돈 넣기" 버튼 제거 */}

      {/* 공유/캘린더 보조 액션 제거 */}

      <Bottom>
        <HomeButton onClick={handleHome}>홈으로</HomeButton>
      </Bottom>
    </Container>
  );
};

export default Complete;

// 스타일
const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 12px 16px 80px;
  box-sizing: border-box;
  position: relative;
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

const Congrats = styled.section`
  position: relative;
  text-align: center;
  margin: 12px -8px 16px;
  padding: 32px 12px 16px;
  border-radius: 24px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: radial-gradient(
        520px 320px at 50% 22%,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.4) 36%,
        rgba(255, 255, 255, 0) 64%
      ),
      radial-gradient(
        600px 360px at 50% 34%,
        rgba(250, 240, 170, 0.18) 0%,
        rgba(250, 240, 170, 0) 60%
      ),
      linear-gradient(
        135deg,
        rgba(97, 104, 251, 0.16) 0%,
        rgba(145, 105, 240, 0.14) 50%,
        rgba(200, 97, 229, 0.12) 100%
      );
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 28%;
    transform: translate(-50%, -50%);
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(154, 119, 255, 0.22) 0%,
      rgba(154, 119, 255, 0.06) 55%,
      rgba(154, 119, 255, 0) 70%
    );
    filter: blur(6px);
    z-index: -1;
  }
`;

const CongratsTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.text};
`;

const CongratsDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const SuccessImg = styled.img`
  display: block;
  width: 50%;
  max-width: 250px;
  margin: 14px auto 0;
  pointer-events: none;
  filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.18))
    drop-shadow(0 8px 18px rgba(154, 119, 255, 0.18));
`;

const Card = styled.section`
  position: relative;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid rgba(154, 119, 255, 0.18);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(154, 119, 255, 0.08) 0%,
      rgba(154, 119, 255, 0.05) 55%,
      rgba(154, 119, 255, 0.03) 100%
    );
    pointer-events: none;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

/* 공유/캘린더 스타일 제거 */

/* 제거된 버튼 스타일 */

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

const HomeButton = styled.button`
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

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(154, 119, 255, 0.25);
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
