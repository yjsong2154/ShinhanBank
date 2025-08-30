// 파일 목적: 백엔드 상품 데이터를 기반으로 입력 단계를 구성합니다. (일반/챌린지/정기예금)
// 주요 섹션: 상단 히어로(이자 세후, 안내), 금액 슬라이더 + 직접 입력, 약관/안내, 다음 버튼.
// 주의사항: 실행 시간/스케줄 영역 제거. 최소·최대 금액을 슬라이더로 제한하며, 이자 계산은 단순 세후 공식 적용.

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { termsDocuments } from "../../api/mockDataTerms";
import type { ProductType } from "../../api/mockDataSavingProducts";
import {
  getBucketCreateList,
  type CreateListItem,
} from "../../api/getCreateList";

type IncomingState = {
  productType?: ProductType;
  productId?: string;
  periodDays?: number; // 선호: 일 단위 기간
  termMonths?: number; // 대체: 월 단위 기간(없으면 무시)
  bucketName?: string;
  bucketDescription?: string;
  bucketPublic?: boolean;
};

const FixedSavingInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // 전달 데이터 수신: location.state 우선, 없으면 URL 쿼리로 보조
  const {
    productType,
    productId,
    periodDays: stateDays,
    termMonths,
    bucketName,
    bucketDescription,
    bucketPublic,
  } = (location.state as IncomingState) || {};

  const qpType = searchParams.get("type") as ProductType | null;
  const qpProductId = searchParams.get("productId");
  const qpDays = searchParams.get("periodDays");

  const resolvedType: ProductType | undefined =
    productType || qpType || undefined;
  const resolvedProductId = productId || qpProductId || undefined;

  const resolvedDays = useMemo(() => {
    const fromState = typeof stateDays === "number" ? stateDays : undefined;
    const fromQuery = qpDays ? Number(qpDays) : undefined;
    if (fromState && fromState > 0) return fromState;
    if (fromQuery && fromQuery > 0) return fromQuery;
    if (termMonths && termMonths > 0) return termMonths * 30; // 간단 환산(30일/월)
    return 30; // 기본값(30일)
  }, [stateDays, qpDays, termMonths]);

  // 백엔드 상품 상세: create_list에서 찾아 사용
  const [list, setList] = useState<CreateListItem[]>([]);
  const product = useMemo(() => {
    if (!resolvedProductId) return undefined;
    return list.find((i) => i.accountTypeUniqueNo === resolvedProductId);
  }, [resolvedProductId, list]);

  // 입력 상태: 금액(슬라이더/직접입력)
  const [amount, setAmount] = useState<number>(0);
  const [manualInput, setManualInput] = useState<boolean>(false);
  const [amountInputText, setAmountInputText] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false); // 최초 로드 여부

  // 초기 포커싱/기본값
  useEffect(() => {
    // 상품 목록 로드 및 초기 금액을 최소값으로 설정
    (async () => {
      try {
        const data = await getBucketCreateList();
        setList(data);
      } catch {
        // 네트워크 오류는 상단 히어로/입력만 표시하고 진행 가능(다음 단계에서 재검증)
      }
    })();
  }, []);

  // 금액 포맷 헬퍼
  const formatMoney = (n: number) => (isFinite(n) ? n.toLocaleString() : "0");
  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  // 스케줄 텍스트 계산: 시작일(오늘), 기간 일수, 첫/마지막 실행일
  const today = useMemo(() => new Date(), []);

  const addDays = (base: Date, days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  };

  const formatDate = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const endDate = useMemo(
    () => addDays(today, Math.max(resolvedDays, 0)),
    [today, resolvedDays]
  );

  const handleNext = () => {
    const isEnabled = amount > 0 && !!resolvedProductId && resolvedDays > 0;
    if (!isEnabled) return;
    navigate("/buckets/character-setup", {
      state: {
        productType: resolvedType,
        productId: resolvedProductId,
        periodDays: resolvedDays,
        amountPerDay: amount, // td 에서는 일시 예치 금액으로 사용
        bucketName,
        bucketDescription,
        bucketPublic,
      },
    });
  };
  // 이자 세후 계산: (원금 × (이자율/100) × (일수/365)) × 0.846
  const ratePercent = product ? Number(product.interestRate) || 0 : 0;
  // 백엔드 최소/최대는 총 금액 기준 → 일 납입 금액 한도를 기간으로 나누어 산출
  const totalMin = product ? Number(product.minSubscriptionBalance) || 0 : 0;
  const totalMax = product ? Number(product.maxSubscriptionBalance) || 0 : 0;
  const isTermDeposit = resolvedType === "td";
  const safeDays = Math.max(resolvedDays || 0, 0);
  const minPerUnit = product
    ? isTermDeposit
      ? totalMin
      : safeDays > 0
      ? Math.ceil(totalMin / safeDays)
      : 0
    : 0;
  const maxPerUnit = product
    ? isTermDeposit
      ? totalMax
      : safeDays > 0
      ? Math.floor(totalMax / safeDays)
      : 0
    : 0;

  // 히어로 계산에 사용할 금액: 수기 입력이 최대 초과 시 최대값으로 계산
  const amountForHero = useMemo(() => {
    if (!product) return 0;
    if (manualInput && amount > maxPerUnit) return maxPerUnit;
    return amount;
  }, [product, manualInput, amount, maxPerUnit]);

  const principal = useMemo(() => {
    if (!product) return 0;
    if (resolvedType === "td") return amountForHero; // 정기예금: 일시 예치
    return amountForHero * resolvedDays; // 일반/챌린지: 매일 납입 총액
  }, [product, resolvedType, amountForHero, resolvedDays]);

  const afterTaxInterest = useMemo(() => {
    if (!product || ratePercent <= 0 || resolvedDays <= 0 || principal <= 0)
      return 0;
    const interest = principal * (ratePercent / 100) * (resolvedDays / 365);
    return Math.floor(interest * 0.846);
  }, [product, ratePercent, resolvedDays, principal]);

  // 초기값: 최초 로드시에만 일 납입 최소 금액(정기예금은 총 금액 최소)으로 설정
  useEffect(() => {
    if (!product || initialized) return;
    const initMin = minPerUnit;
    setAmount(initMin);
    setAmountInputText((t) => (t === "" ? String(initMin) : t));
    setInitialized(true);
  }, [product, initialized, minPerUnit]);

  // accountDescription에서 is_challenge/description 추출
  const { isChallenge, challengeDesc } = useMemo(() => {
    if (!product) return { isChallenge: false, challengeDesc: "" };
    try {
      const obj = JSON.parse(product.accountDescription || "{}");
      const flag = String(obj?.is_challenge).toLowerCase() === "true";
      return { isChallenge: flag, challengeDesc: obj?.description || "" };
    } catch {
      return { isChallenge: false, challengeDesc: "" };
    }
  }, [product]);

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>매일 납입 설정</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Hero>
        <HeroTitle>
          {resolvedType === "td" ? "이렇게 맡기면" : "이렇게 모으면"}
        </HeroTitle>
        <HeroRow>
          <HeroLabel>이자(세후)</HeroLabel>
          <HeroValue>{formatMoney(afterTaxInterest)}원</HeroValue>
        </HeroRow>
        {resolvedType === "td" ? (
          <HeroSub>{`${formatDate(endDate)}에 받아요`}</HeroSub>
        ) : (
          <HeroSub>
            {`${formatDate(endDate)}까지 원금 ${formatMoney(
              principal
            )}원 모아요`}
          </HeroSub>
        )}
        {resolvedType !== "td" && isChallenge && challengeDesc && (
          <HeroDesc>{challengeDesc}</HeroDesc>
        )}
      </Hero>

      <SectionTitle>입력</SectionTitle>

      <Field>
        <Label>{resolvedType === "td" ? "예금액" : "매일 납입 금액"}</Label>
        {product && (
          <RangeWrap>
            <RangeInput
              type="range"
              min={minPerUnit}
              max={maxPerUnit}
              step={1}
              value={clamp(amount, minPerUnit, maxPerUnit)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(
                  clamp(Number(e.target.value) || 0, minPerUnit, maxPerUnit)
                )
              }
              aria-label="금액 슬라이더"
            />
            <RangeMeta>
              <span>{formatMoney(minPerUnit)}원</span>
              <strong>
                {formatMoney(clamp(amount, minPerUnit, maxPerUnit))}원
              </strong>
              <span>{formatMoney(maxPerUnit)}원</span>
            </RangeMeta>
          </RangeWrap>
        )}
        <InlineButtons>
          <SmallButton
            onClick={() => {
              setManualInput((v) => !v);
              if (!manualInput) {
                setAmountInputText(amount > 0 ? String(amount) : "");
              }
            }}
          >
            {manualInput ? "슬라이더로 설정" : "직접 입력하기"}
          </SmallButton>
        </InlineButtons>
        {manualInput && (
          <Input
            type="text"
            inputMode="numeric"
            value={amountInputText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const digits = e.target.value.replace(/[^0-9]/g, "");
              setAmountInputText(digits);
              setAmount(Number(digits || 0));
            }}
            aria-label="금액 직접 입력"
          />
        )}
        <HelperText>내일부터 매일 아침 6시 반에 자동 이체돼요</HelperText>
        {product && (amount < minPerUnit || amount > maxPerUnit) && (
          <WarningText>
            납입금액은 최소 {formatMoney(minPerUnit)}원 최대{" "}
            {formatMoney(maxPerUnit)}원 입니다
          </WarningText>
        )}
      </Field>

      {/* 스케줄 섹션 제거 */}

      {/* 약관/확인 섹션: InfoTerms 내용을 하단에 병합 */}
      <SectionTitle>약관/안내</SectionTitle>
      <Accordion>
        <Item>
          <Summary>상품 안내</Summary>
          <Panel>
            <Paragraph>가입대상: 은행 통장을 보유한 실명의 개인</Paragraph>
            <Paragraph>예금종류: 정기적금(자유 적금도 가능)</Paragraph>
            <Paragraph>최초 가입금액: 0원 ~ 300만원</Paragraph>
            <Paragraph>
              월 저금 금액: 가입자가 설정한 매일 납입 금액의 합
            </Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>금리 정보</Summary>
          <Panel>
            <Paragraph>
              금리(세전)는 상품/기간에 따라 다르며, 우대 조건 충족 시
              최고금리까지 적용될 수 있습니다. 실제 이자 계산은 백엔드 기준으로
              산정됩니다.
            </Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>미리 빼기 및 해지 안내</Summary>
          <Panel>
            <Paragraph>중도해지 시 중도해지 이율이 적용됩니다.</Paragraph>
            <Paragraph>
              자동이체 실패가 지속될 경우 상품이 해지될 수 있습니다.
            </Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>기타사항</Summary>
          <Panel>
            <Paragraph>
              세금우대/비과세 적용 여부는 개별 요건에 따라 달라질 수 있습니다.
            </Paragraph>
            <Paragraph>상세 내용은 상품설명서를 참고하세요.</Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>상품설명서 및 이용약관</Summary>
          <Panel>
            <DocList>
              {termsDocuments
                .filter((d) => d.type === "document")
                .map((d) => (
                  <DocItem
                    key={d.id}
                    onClick={() =>
                      navigate(`/buckets/pdf/${d.id}`, {
                        state: {
                          productType: resolvedType,
                          productId: resolvedProductId,
                          periodDays: resolvedDays,
                          amountPerDay: amount,
                        },
                      })
                    }
                  >
                    {d.title}
                  </DocItem>
                ))}
            </DocList>
          </Panel>
        </Item>
      </Accordion>

      <Notice>심의필 문구 자리입니다. (예: 2025-XXX-XXXX)</Notice>

      <Bottom>
        <NextButton
          disabled={
            amount <= 0 ||
            !product ||
            (product && (amount < minPerUnit || amount > maxPerUnit))
          }
          onClick={handleNext}
        >
          다음
        </NextButton>
      </Bottom>
    </Container>
  );
};

export default FixedSavingInput;

// 스타일
const Container = styled.div`
  padding: 20px 20px;
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
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  margin: 16px 0px;
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

const HeroSub = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

const HeroDesc = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

// 스케줄 스타일 제거

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
  }
`;

// InfoTerms 병합: 간단 아코디언/리스트 스타일
const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0;
`;

const Item = styled.details`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 8px 12px;
`;

const Summary = styled.summary`
  cursor: pointer;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
`;

const Panel = styled.div`
  margin-top: 10px;
`;

const DocList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DocItem = styled.li`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const Notice = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 12px;
  margin: 12px 0 8px;
`;

const Paragraph = styled.p`
  margin: 6px 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  font-size: 14px;
`;

const RangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 28px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  accent-color: #9a77ff; /* 최신 브라우저 기본 색상 */

  &:focus-visible {
    outline: none;
  }

  /* WebKit (Chrome/Safari/Edge Chromium) */
  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(90deg, #eeeaff 0%, #efeaff 100%);
    box-shadow: inset 0 1px 2px rgba(154, 119, 255, 0.15);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -8px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #9a77ff;
    box-shadow: 0 2px 8px rgba(154, 119, 255, 0.35);
    cursor: pointer;
    transition: transform 0.12s ease, box-shadow 0.2s ease, filter 0.2s ease;
  }
  &:hover::-webkit-slider-thumb {
    box-shadow: 0 4px 12px rgba(154, 119, 255, 0.4);
    filter: brightness(1.02);
  }
  &:active::-webkit-slider-thumb {
    transform: scale(0.98);
    box-shadow: 0 2px 6px rgba(154, 119, 255, 0.3);
  }

  /* Firefox */
  &::-moz-range-track {
    height: 6px;
    border-radius: 999px;
    background: #efeaff;
  }
  &::-moz-range-progress {
    height: 6px;
    border-radius: 999px;
    background: #9a77ff;
  }
  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #9a77ff;
    box-shadow: 0 2px 8px rgba(154, 119, 255, 0.35);
    cursor: pointer;
  }
`;

const RangeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`;

const InlineButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  border-radius: 15px;
  border: 2px solid #9a77ff;
  background: #fff;
  color: #9a77ff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.12s ease,
    border-color 0.2s ease;

  &:hover {
    background: #9a77ff;
    color: #fff;
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(154, 119, 255, 0.25);
  }
`;
const HelperText = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 12px;
`;

const WarningText = styled.p`
  margin: 6px 0 0;
  color: #d32f2f;
  font-size: 12px;
`;
