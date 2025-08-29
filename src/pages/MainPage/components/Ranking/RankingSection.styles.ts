import styled from "styled-components";

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const RankingList = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
`;

// 추가
export const RankingCard = styled.div`
  background: #f7f6ff;
  border-radius: 16px;
  overflow: hidden; /* 둥근 모서리 안으로 내용 클리핑 */
  display: flex;
  flex-direction: column;
`;

export const PodiumBar = styled.div`
  padding: 10px 12px 8px; /* TOP3 영역 여백 */
`;

export const ListPanel = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const EmptyRow = styled.div`
  padding: 14px 6px;
  text-align: center;
  color: #9a91b8;
`;

export const TabHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${(props) => (props.$isActive ? props.theme.colors.primary : "#f0f0f0")};
  color: ${(props) => (props.$isActive ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`;

export const TabContent = styled.div`
  /* Add any content-specific styles here */
`;