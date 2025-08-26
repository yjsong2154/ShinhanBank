// 파일 목적: 적금/예금 개설 시작 페이지. 유형 탭, 상품 카드 선택, 다음 단계로 이동.
// 주요 섹션: 탭/히어로 요약/상품 카드 리스트/다음 버튼. 상태는 내부 상태 + navigate 시 전달.
// 주의사항: 금리 표시는 세전(base/max)만. 적금 주기는 '매일'만 노출. 이자/원금 계산 로직 없음.

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import type { ProductType } from "../../api/mockDataSavingProducts";
import { savingProducts } from "../../api/mockDataSavingProducts";

type Tab = {
  key: ProductType;
  label: string;
  route: string;
};

const TABS: Tab[] = [
  { key: "fixed", label: "적금(고정)", route: "/buckets/fixed" },
  { key: "flexible", label: "적금(자유)", route: "/buckets/flexible" },
  { key: "td", label: "정기예금", route: "/buckets/td" },
];

const NewBucketStart = () => {
  // 현재 위치 기반으로 활성 탭 결정
  const location = useLocation();
  const navigate = useNavigate();

  const currentTabKey: ProductType = useMemo(() => {
    if (location.pathname.includes("/buckets/flexible")) return "flexible";
    if (location.pathname.includes("/buckets/td")) return "td";
    return "fixed";
  }, [location.pathname]);

  // 선택 상태: 상품 ID, 기간(개월)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  const productsForTab = useMemo(
    () => savingProducts.filter((p) => p.type === currentTabKey),
    [currentTabKey]
  );

  const selectedProduct = useMemo(
    () => productsForTab.find((p) => p.id === selectedProductId) || null,
    [productsForTab, selectedProductId]
  );

  // 탭 변경 또는 최초 진입 시 기본 선택(첫 상품/첫 기간)
  useEffect(() => {
    if (!selectedProductId && productsForTab.length > 0) {
      const first = productsForTab[0];
      setSelectedProductId(first.id);
      setSelectedTerm(first.terms?.[0] ?? null);
    }
  }, [productsForTab, selectedProductId]);

  const heroTitle = useMemo(() => {
    switch (currentTabKey) {
      case "fixed":
        return "이렇게 모으면";
      case "flexible":
        return "이렇게 모으면";
      case "td":
        return "이렇게 맡기면";
      default:
        return "요약";
    }
  }, [currentTabKey]);

  const handleChangeTab = (tab: Tab) => {
    // 선택 상태는 페이지 단위로 유지. 탭 이동 시 선택 초기화.
    setSelectedProductId(null);
    setSelectedTerm(null);
    navigate(tab.route, { replace: true });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    // 제품 클릭 시 기본 기간을 자동 선택(첫 번째 항목)
    const p = productsForTab.find((x) => x.id === productId);
    setSelectedTerm(p?.terms?.[0] ?? null);
  };

  const handleSelectTerm = (term: number) => {
    setSelectedTerm(term);
  };

  const handleNext = () => {
    if (!selectedProductId || !selectedTerm) return;
    const selectedProduct = productsForTab.find((p) => p.id === selectedProductId);
    if (!selectedProduct) return;

    // 다음 단계(입력 페이지)로 이동. 고정/자유/예금 모두 동일 페이지를 쓰되,
    // 우선 고정 유형 경로에 맞춰 이동. 필요 시 유형별 분기 추가 가능.
    navigate("/buckets/fixed/input", {
      state: {
        productId: selectedProduct.id,
        productType: selectedProduct.type,
        termMonths: selectedTerm,
      },
    });
  };

  const isNextEnabled = selectedProductId !== null && selectedTerm !== null;

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>새 저축 시작</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Tabs>
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            $active={currentTabKey === tab.key}
            onClick={() => handleChangeTab(tab)}
          >
            {tab.label}
          </TabButton>
        ))}
      </Tabs>

      <Hero>
        <HeroTitle>{heroTitle}</HeroTitle>
        <HeroRow>
          <HeroLabel>주기</HeroLabel>
          <HeroValue>매일</HeroValue>
        </HeroRow>
        <HeroRow>
          <HeroLabel>금리(세전)</HeroLabel>
          <HeroValue>
            {selectedProduct
              ? `${selectedProduct.baseRate.toFixed(1)}% ~ ${selectedProduct.maxRate.toFixed(1)}%`
              : productsForTab[0]
              ? `${productsForTab[0].baseRate.toFixed(1)}% ~ ${productsForTab[0].maxRate.toFixed(1)}%`
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

      <SectionTitle>상품 선택</SectionTitle>

      <Cards>
        {productsForTab.map((p) => {
          const isSelectedProduct = selectedProductId === p.id;
          return (
            <Card key={p.id} $selected={isSelectedProduct} onClick={() => handleSelectProduct(p.id)}>
              <CardHeader>
                <CardName>{p.name}</CardName>
                <Rate>
                  <RateItem>
                    <RateLabel>기본</RateLabel>
                    <RateValue>{p.baseRate.toFixed(1)}%</RateValue>
                  </RateItem>
                  <Divider />
                  <RateItem>
                    <RateLabel>최대</RateLabel>
                    <RateValue>{p.maxRate.toFixed(1)}%</RateValue>
                  </RateItem>
                </Rate>
              </CardHeader>

              <Chips>
                {p.terms.map((m) => (
                  <Chip
                    key={m}
                    $active={isSelectedProduct && selectedTerm === m}
                    onClick={(e) => {
                      e.stopPropagation();
                      // 칩만 눌러도 선택 완료되도록 제품/기간 동시 설정
                      setSelectedProductId(p.id);
                      handleSelectTerm(m);
                    }}
                  >
                    {m}개월
                  </Chip>
                ))}
              </Chips>
            </Card>
          );
        })}
      </Cards>

      <Bottom>
        <NextButton disabled={!isNextEnabled} onClick={handleNext}>
          다음
        </NextButton>
      </Bottom>
    </Container>
  );
};

export default NewBucketStart;

// 스타일: 기존 페이지 스타일 경향에 맞춘 간단한 구성
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 8px 0 16px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 8px;
  border-radius: 8px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.lightGray)};
  background: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.secondary)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: 600;
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

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div<{ $selected: boolean }>`
  border-radius: 12px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.secondary)};
  background: ${({ theme }) => theme.colors.white};
  padding: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CardName = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.colors.lightGray};
`;

const RateItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RateLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const RateValue = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.lightGray)};
  background: ${({ $active, theme }) => ($active ? theme.colors.secondary : theme.colors.white)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 12px;
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


