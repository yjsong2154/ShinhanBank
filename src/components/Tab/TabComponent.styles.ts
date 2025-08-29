import styled from "styled-components";

// 스타일드 컴포넌트 정의
export const TabContainer = styled.div`
  width: 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 4px;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  padding: 10px 20px;
  border: 2px solid #9a77ff;
  border-radius: 15px;
  background-color: ${(props) => (props.$isActive ? "#9A77FF" : "#fff")};
  color: ${(props) => (props.$isActive ? "#fff" : "#9A77FF")};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#9A77FF" : "#7a55dd")};
    color: #fff;
  }
`;

export const TabContent = styled.div`
  margin-top: 16px;
`;

export const TabPanel = styled.div`
  width: 100%;
`;
