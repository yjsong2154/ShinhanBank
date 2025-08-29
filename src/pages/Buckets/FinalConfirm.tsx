// 파일 목적: 최종 확인 단계. 요약(저금액/가입기간/금리/출금계좌) 표시 후 적금통 생성 API 호출.
// 주요 섹션: 타이틀/요약 섹션/캐릭터 섹션(추후)/확인 버튼. 성공 시 완료 페이지로 이동.
// 주의사항: 금리는 create_list에서 조회한 interestRate 사용. 캐릭터/출금계좌는 추후 추가 예정.

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import type { ProductType } from "../../api/mockDataSavingProducts";
import { getBucketCreateList, type CreateListItem } from "../../api/getCreateList";
import { createBucket } from "../../api/createBucket";

type IncomingState = {
  productType?: ProductType;
  productId?: string;
  periodDays?: number;
  amountPerDay?: number; // fixed/flexible
  executeTime?: string; // HH:MM
  // td 의 경우 amountPerDay를 일시 예치 금액으로 사용
  bucketName?: string;
  bucketDescription?: string;
  bucketPublic?: boolean;
};

const FinalConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as IncomingState;

  // 상품 정보: create_list에서 찾기
  const [list, setList] = useState<CreateListItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getBucketCreateList();
        setList(data);
      } catch {
        // 네트워크 오류 시 금리 표시는 생략
      }
    })();
  }, []);
  const product = useMemo(
    () => list.find((i) => i.accountTypeUniqueNo === state.productId),
    [list, state.productId]
  );

  const [submitting, setSubmitting] = useState(false);

  const amount = state.amountPerDay || 0;
  const days = state.periodDays || 0;
  const type = state.productType || "fixed";
  const name = state.bucketName || "제 첫 적금통 입니다.";
  const description = state.bucketDescription || "졸업할때까지 1억을 모으려고 합니다.";
  const isPublicFlag = state.bucketPublic !== false; // 기본값 공개
  // 총액 계산: 정기예금(td)은 일시 예치이므로 amount 그대로, 그 외는 일수 × 일 납입 금액
  const targetAmount = useMemo(() => (type === "td" ? amount : days * amount), [type, amount, days]);

  const interestRate = product ? Number(product.interestRate) || 0 : 0;

  const handleConfirm = async () => {
    if (!state.productId || !days || !amount) {
      // eslint-disable-next-line no-alert
      alert("입력 값이 부족합니다.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createBucket({
        name,
        description,
        accountTypeUniqueNo: state.productId,
        target_amount: targetAmount,
        is_public: isPublicFlag ? "TRUE" : "FALSE",
        deposit_cycle: "daily",
        character_item_id: 1,
        outfit_item_id: 4,
        hat_item_id: 7,
      });

      navigate("/buckets/complete", {
        state: {
          bucketId: (res && (res as any).bucketId) || undefined,
          productType: type,
          periodDays: days,
          amount,
        },
      });
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
        <TopTitle>이렇게 시작할게요</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Hero>
        <HeroRow>
          <HeroLabel>저금액</HeroLabel>
          <HeroValue>매일 {amount.toLocaleString()}원씩</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>가입기간</HeroLabel>
          <HeroValue>{days}일</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>금리</HeroLabel>
          <HeroValue>{product ? `${interestRate}%` : "—%"}</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>출금계좌</HeroLabel>
          <HeroValue>추후 추가 예정</HeroValue>
        </HeroRow>
      </Hero>

      <Hero>
        <HeroRow>
          <HeroLabel>캐릭터</HeroLabel>
          <HeroValue>추후 추가 예정</HeroValue>
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

// 사용되지 않는 스타일 제거

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



