// 파일 목적: 고정 적금 입력 단계. 매일 납입 금액/실행 시간 입력 및 일정 요약 표시.
// 주요 섹션: 상단 요약(금리), 입력 폼(금액/시간), 스케줄 텍스트, 다음 버튼.
// 주의사항: 이전 화면에서 전달된 type/productId/periodDays(or termMonths) 사용. 이자/원금 계산 없음.

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { savingProducts } from "../../api/mockDataSavingProducts";
import { termsDocuments } from "../../api/mockDataTerms";
import type { ProductType } from "../../api/mockDataSavingProducts";

type IncomingState = {
  productType?: ProductType;
  productId?: string;
  periodDays?: number; // 선호: 일 단위 기간
  termMonths?: number; // 대체: 월 단위 기간(없으면 무시)
};

const FixedSavingInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // 전달 데이터 수신: location.state 우선, 없으면 URL 쿼리로 보조
  const { productType, productId, periodDays: stateDays, termMonths } =
    (location.state as IncomingState) || {};

  const qpType = searchParams.get("type") as ProductType | null;
  const qpProductId = searchParams.get("productId");
  const qpDays = searchParams.get("periodDays");

  const resolvedType: ProductType | undefined = productType || qpType || undefined;
  const resolvedProductId = productId || qpProductId || undefined;

  const resolvedDays = useMemo(() => {
    const fromState = typeof stateDays === "number" ? stateDays : undefined;
    const fromQuery = qpDays ? Number(qpDays) : undefined;
    if (fromState && fromState > 0) return fromState;
    if (fromQuery && fromQuery > 0) return fromQuery;
    if (termMonths && termMonths > 0) return termMonths * 30; // 간단 환산(30일/월)
    return 30; // 기본값(30일)
  }, [stateDays, qpDays, termMonths]);

  const product = useMemo(() => {
    if (!resolvedProductId) return undefined;
    return savingProducts.find((p) => p.id === resolvedProductId);
  }, [resolvedProductId]);

  // 입력 상태: 금액(문자열; 천단위 포맷), 실행 시간("HH:MM")
  const [amountInput, setAmountInput] = useState<string>("");
  const [timeInput, setTimeInput] = useState<string>("09:00");

  // 초기 포커싱/기본값
  useEffect(() => {
    if (amountInput === "") setAmountInput("0");
  }, [amountInput]);

  // 금액 입력: 숫자만, 천단위 포맷
  const formatThousand = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits === "") return "0";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseAmountNumber = (formatted: string) => {
    const digits = formatted.replace(/[^0-9]/g, "");
    return Number(digits || 0);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(formatThousand(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);
  };

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

  const firstDate = today; // 간단 표기: 시작일=첫 실행일
  const lastDate = useMemo(() => addDays(today, Math.max(resolvedDays - 1, 0)), [today, resolvedDays]);

  const handleNext = () => {
    const isEnabled = parseAmountNumber(amountInput) > 0 && !!resolvedProductId && resolvedDays > 0;
    if (!isEnabled) return;
    // 다음 단계 라우트는 아직 정의하지 않음. 상태만 콘솔로 확인.
    const amountNumber = parseAmountNumber(amountInput);
    navigate("/buckets/final-confirm", {
      state: {
        productType: resolvedType,
        productId: resolvedProductId,
        periodDays: resolvedDays,
        amountPerDay: amountNumber,
        executeTime: timeInput,
      },
    });
  };

  const baseRate = product?.baseRate;
  const maxRate = product?.maxRate;

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>매일 납입 설정</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Hero>
        <HeroTitle>요약</HeroTitle>
        <HeroRow>
          <HeroLabel>주기</HeroLabel>
          <HeroValue>매일</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>금리(세전)</HeroLabel>
          <HeroValue>
            {baseRate !== undefined && maxRate !== undefined
              ? `${baseRate.toFixed(1)}% ~ ${maxRate.toFixed(1)}%`
              : "—"}
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

      <SectionTitle>입력</SectionTitle>

      <Field>
        <Label>매일 납입 금액</Label>
        <Input
          type="text"
          inputMode="numeric"
          value={amountInput}
          onChange={handleAmountChange}
          aria-label="매일 납입 금액"
        />
      </Field>

      <Field>
        <Label>실행 시간</Label>
        <Input type="time" value={timeInput} onChange={handleTimeChange} aria-label="실행 시간" />
      </Field>

      <SectionTitle>스케줄</SectionTitle>
      <Schedule>
        <ScheduleRow>
          <span>시작일</span>
          <strong>{formatDate(today)}</strong>
        </ScheduleRow>
        <ScheduleRow>
          <span>기간</span>
          <strong>{resolvedDays}일</strong>
        </ScheduleRow>
        <ScheduleRow>
          <span>첫 실행일</span>
          <strong>
            {formatDate(firstDate)} {timeInput}
          </strong>
        </ScheduleRow>
        <ScheduleRow>
          <span>마지막 실행일</span>
          <strong>
            {formatDate(lastDate)} {timeInput}
          </strong>
        </ScheduleRow>
      </Schedule>

      {/* 약관/확인 섹션: InfoTerms 내용을 하단에 병합 */}
      <SectionTitle>약관/안내</SectionTitle>
      <Accordion>
        <Item>
          <Summary>상품 안내</Summary>
          <Panel>
            <Paragraph>가입대상: 은행 통장을 보유한 실명의 개인</Paragraph>
            <Paragraph>예금종류: 정기적금(자유 적금도 가능)</Paragraph>
            <Paragraph>최초 가입금액: 0원 ~ 300만원</Paragraph>
            <Paragraph>월 저금 금액: 가입자가 설정한 매일 납입 금액의 합</Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>금리 정보</Summary>
          <Panel>
            <Paragraph>
              금리(세전)는 상품/기간에 따라 다르며, 우대 조건 충족 시 최고금리까지 적용될 수
              있습니다. 실제 이자 계산은 백엔드 기준으로 산정됩니다.
            </Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>미리 빼기 및 해지 안내</Summary>
          <Panel>
            <Paragraph>중도해지 시 중도해지 이율이 적용됩니다.</Paragraph>
            <Paragraph>자동이체 실패가 지속될 경우 상품이 해지될 수 있습니다.</Paragraph>
          </Panel>
        </Item>
        <Item>
          <Summary>기타사항</Summary>
          <Panel>
            <Paragraph>세금우대/비과세 적용 여부는 개별 요건에 따라 달라질 수 있습니다.</Paragraph>
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
                          amountPerDay: parseAmountNumber(amountInput),
                          executeTime: timeInput,
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
        <NextButton disabled={parseAmountNumber(amountInput) <= 0} onClick={handleNext}>다음</NextButton>
      </Bottom>
    </Container>
  );
};

export default FixedSavingInput;

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

const Schedule = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const ScheduleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
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
  &:disabled {
    opacity: 0.4;
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


