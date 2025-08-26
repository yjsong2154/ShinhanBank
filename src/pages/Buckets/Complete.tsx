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

  const handleToast = (m: string) => {
    // eslint-disable-next-line no-alert
    alert(m);
  };

  const isFlexible = type === "flexible";

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>개설 완료</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Congrats>
        <CongratsTitle>축하합니다!</CongratsTitle>
        <CongratsDesc>새 저축이 성공적으로 개설되었습니다.</CongratsDesc>
      </Congrats>

      <Card>
        <Row>
          <Label>유형</Label>
          <Value>
            {type === "fixed" ? "적금(고정)" : type === "flexible" ? "적금(자유)" : "정기예금"}
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
  text-align: center;
  margin: 16px 0 12px;
`;

const CongratsTitle = styled.h2`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.text};
`;

const CongratsDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Card = styled.section`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  margin-bottom: 16px;
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
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;


