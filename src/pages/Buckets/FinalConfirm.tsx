// 파일 목적: 개설 최종 확인 단계. 이전 단계 state 요약 표시 및 개설 API 호출.
// 주요 섹션: 상단 헤더/요약(주기·금액·기간, 금리 세전 base~max), 확인 버튼 → 모의 API 호출.
// 주의사항: 원금/이자 계산 없음. API는 모의(openBucket) 사용. 실패 시 alert 토스트 대체.

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { savingProducts } from "../../api/mockDataSavingProducts";
import type { ProductType } from "../../api/mockDataSavingProducts";
import type { OpenBucketRequest } from "../../api/createSavings";
import { openBucket } from "../../api/createSavings";

type IncomingState = {
  productType?: ProductType;
  productId?: string;
  periodDays?: number;
  amountPerDay?: number; // fixed/flexible
  executeTime?: string; // HH:MM
  // td 의 경우 amountPerDay를 일시 예치 금액으로 사용
};

const FinalConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as IncomingState;

  const product = useMemo(
    () => savingProducts.find((p) => p.id === state.productId),
    [state.productId]
  );

  const [submitting, setSubmitting] = useState(false);

  const amount = state.amountPerDay || 0;
  const time = state.executeTime || "09:00";
  const days = state.periodDays || 0;
  const type = state.productType || "fixed";

  const summaryText = useMemo(() => {
    switch (type) {
      case "fixed":
        return `매일 ${time} · ${amount.toLocaleString()}원 / 기간 ${days}일`;
      case "flexible":
        return `매일 ${time} · ${amount.toLocaleString()}원 자동이체 / 기간 ${days}일`;
      case "td":
        return `일시 예치 ${amount.toLocaleString()}원 / 기간 ${days}일`;
      default:
        return "";
    }
  }, [type, time, amount, days]);

  const handleConfirm = async () => {
    if (!state.productId || !days || !amount) {
      // eslint-disable-next-line no-alert
      alert("입력 값이 부족합니다.");
      return;
    }
    const req: OpenBucketRequest = {
      productType: type,
      productId: state.productId,
      periodDays: days,
      amount,
      executeTime: type !== "td" ? time : undefined,
    };

    setSubmitting(true);
    try {
      const res = await openBucket(req);
      if (res.success) {
        navigate("/buckets/complete", {
          state: {
            bucketId: res.bucketId,
            productType: type,
            periodDays: days,
            amount,
            executeTime: type !== "td" ? time : undefined,
          },
        });
      } else {
        // eslint-disable-next-line no-alert
        alert(res.message || "개설에 실패했습니다.");
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("개설 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>최종 확인</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Hero>
        <HeroTitle>요약</HeroTitle>
        <HeroRow>
          <HeroLabel>내용</HeroLabel>
          <HeroValue>{summaryText}</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>금리(세전)</HeroLabel>
          <HeroValue>
            {product ? `${product.baseRate.toFixed(1)}% ~ ${product.maxRate.toFixed(1)}%` : "—"}
          </HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>원금</HeroLabel>
          <HeroValue>—</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>이자</HeroLabel>
          <HeroValue>—</HeroValue>
        </HeroRow>
      </Hero>

      <Bottom>
        <ConfirmButton disabled={submitting} onClick={handleConfirm}>
          {submitting ? "처리 중..." : "확인"}
        </ConfirmButton>
      </Bottom>
    </Container>
  );
};

export default FinalConfirm;

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

const Hero = styled.section`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  margin-bottom: 16px;
`;

const HeroTitle = styled.h2`
  font-size: 16px;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const HeroRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
`;

const HeroLabel = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
`;

const HeroValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
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

const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  &:disabled { opacity: 0.5; }
`;


