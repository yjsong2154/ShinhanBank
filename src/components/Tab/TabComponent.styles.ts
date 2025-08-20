import styled from 'styled-components';

// 스타일드 컴포넌트 정의
export const TabContainer = styled.div`
  width: 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 4px;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$isActive ? '#fff' : 'transparent')};
  color: ${(props) => (props.$isActive ? '#5D3FD3' : '#a0a0a0')};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#fff' : '#e0e0e0')};
  }
`;

export const TabContent = styled.div`
  margin-top: 16px;
`;

export const TabPanel = styled.div`
  width: 100%;
`;