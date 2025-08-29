// 파일 목적: 백엔드 상품 목록(/bucket/create_list) 기반으로 새 적금통 시작 화면을 구성합니다.
// 주요 기능: 진입 시 목록 조회, '챌린지/일반적금/정기예금' 탭 분류, 상품 카드 선택 및 다음 단계 이동.
// 주의사항: 히어로 섹션 제거. 상품 정보는 API 응답 필드 위주로 단순 표기합니다.

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getBucketCreateList, type CreateListItem } from "../../api/getCreateList";

// 라우트 키는 기존 경로를 유지합니다: fixed(일반적금), flexible(챌린지), td(정기예금)
type TabKey = "fixed" | "flexible" | "td";

type Tab = {
  key: TabKey;
  label: string;
  route: string;
};

const TABS: Tab[] = [
  { key: "flexible", label: "챌린지", route: "/buckets/flexible" },
  { key: "fixed", label: "일반적금", route: "/buckets/fixed" },
  { key: "td", label: "정기예금", route: "/buckets/td" },
];

const NewBucketStart = () => {
  // 현재 위치 기반으로 활성 탭 결정
  const location = useLocation();
  const navigate = useNavigate();

  const currentTabKey: TabKey = useMemo(() => {
    if (location.pathname.includes("/buckets/flexible")) return "flexible";
    if (location.pathname.includes("/buckets/td")) return "td";
    return "fixed";
  }, [location.pathname]);

  // 서버 데이터 상태
  const [items, setItems] = useState<CreateListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 선택 상태: 상품 ID(accountTypeUniqueNo), 기간(일)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  // accountDescription 내 JSON 파싱: is_challenge 여부 확인
  const isChallenge = (item: CreateListItem): boolean => {
    try {
      const parsed = JSON.parse(item.accountDescription || "{}");
      const val = parsed?.is_challenge;
      return String(val).toLowerCase() === "true";
    } catch {
      return false;
    }
  };

  // 데이터 로드
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBucketCreateList();
        if (!mounted) return;
        setItems(data);
      } catch (e: unknown) {
        if (!mounted) return;
        const message = e instanceof Error ? e.message : "목록 조회에 실패했습니다.";
        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 탭별 분류: 챌린지/일반적금/정기예금
  const challengeItems = useMemo(
    () => items.filter((i) => i.accountTypeName === "적금" && isChallenge(i)),
    [items]
  );
  const savingsItems = useMemo(
    () => items.filter((i) => i.accountTypeName === "적금" && !isChallenge(i)),
    [items]
  );
  const depositItems = useMemo(
    () => items.filter((i) => i.accountTypeName === "예금"),
    [items]
  );

  const productsForTab = useMemo(() => {
    switch (currentTabKey) {
      case "flexible":
        return challengeItems;
      case "td":
        return depositItems;
      case "fixed":
      default:
        return savingsItems;
    }
  }, [currentTabKey, challengeItems, savingsItems, depositItems]);

  // 선택된 상품은 필요 시 개별 핸들러에서 조회합니다.

  // 최초 진입 시 자동 선택하지 않습니다. 사용자가 명시적으로 선택하도록 유지합니다.
  useEffect(() => {
    // no-op: 의도적으로 자동 선택하지 않음
  }, [productsForTab]);

  const handleChangeTab = (tab: Tab) => {
    // 선택 상태는 페이지 단위로 유지. 탭 이동 시 선택 초기화.
    setSelectedProductId(null);
    setSelectedTerm(null);
    navigate(tab.route, { replace: true });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    // 제품 클릭 시 기간(일)을 설정
    const p = productsForTab.find((x) => x.accountTypeUniqueNo === productId);
    setSelectedTerm(p ? Number(p.subscriptionPeriod) || null : null);
  };

  // 기간 선택 UI는 제거되었으나, 내부 상태는 유지합니다.

  const handleNext = () => {
    if (!selectedProductId) return;
    const selectedProduct = productsForTab.find((p) => p.accountTypeUniqueNo === selectedProductId);
    if (!selectedProduct) return;

    // 다음 단계(입력 페이지)로 이동. 현재는 공통 입력 페이지를 사용.
    // productType 매핑: 적금/챌린지 -> "fixed", 예금 -> "td"
    const productType = selectedProduct.accountTypeName === "예금" ? "td" : "fixed";
    const periodDays = selectedTerm || Number(selectedProduct.subscriptionPeriod) || 0;

    // 이름/설명 입력 페이지로 먼저 이동
    navigate("/buckets/info", {
      state: {
        productId: selectedProduct.accountTypeUniqueNo,
        productType,
        periodDays,
      },
    });
  };

  const isNextEnabled = selectedProductId !== null;

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

      {loading ? (
        <LoadingWrap>
          <LoadingSpinner />
        </LoadingWrap>
      ) : error ? (
        <ErrorBox>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={() => {
            setLoading(true);
            setError(null);
            setItems([]);
            setSelectedProductId(null);
            setSelectedTerm(null);
            // 재조회
            (async () => {
              try {
                const data = await getBucketCreateList();
                setItems(data);
              } catch (e: unknown) {
                const message = e instanceof Error ? e.message : "목록 조회에 실패했습니다.";
                setError(message);
              } finally {
                setLoading(false);
              }
            })();
          }}>다시 시도</RetryButton>
        </ErrorBox>
      ) : (
        <>
          <SectionTitle>상품 선택</SectionTitle>

          <Cards>
            {productsForTab.map((p) => {
              const isSelectedProduct = selectedProductId === p.accountTypeUniqueNo;
              const periodDays = Number(p.subscriptionPeriod) || 0;
              return (
                <Card
                  key={p.accountTypeUniqueNo}
                  $selected={isSelectedProduct}
                  onClick={() => handleSelectProduct(p.accountTypeUniqueNo)}
                >
                  <CardHeader>
                    <CardName>{p.accountName}</CardName>
                    <Rate>
                      <RateItem>
                        <RateLabel>금리</RateLabel>
                        <RateValue>{Number(p.interestRate)}%</RateValue>
                      </RateItem>
                    </Rate>
                  </CardHeader>
                  <Meta>
                    <MetaRow>
                      <MetaLabel>기간</MetaLabel>
                      <MetaValue>{periodDays}일</MetaValue>
                    </MetaRow>
                    <MetaRow>
                      <MetaLabel>한도</MetaLabel>
                      <MetaValue>
                        {Number(p.minSubscriptionBalance).toLocaleString()}원 ~ {Number(p.maxSubscriptionBalance).toLocaleString()}원
                      </MetaValue>
                    </MetaRow>
                    {p.rateDescription && (
                      <MetaRow>
                        <MetaLabel>설명</MetaLabel>
                        <MetaDesc>{p.rateDescription}</MetaDesc>
                      </MetaRow>
                    )}
                  </Meta>
                </Card>
              );
            })}
          </Cards>
        </>
      )}

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

// 구분선 스타일은 현재 미사용입니다.

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

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 12px;
`;

const MetaValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 13px;
`;

const MetaDesc = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`;

const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
  padding: 16px;
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const RetryButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
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
    opacity: 0.3;
    filter: grayscale(40%);
    cursor: not-allowed;
  }
`;


