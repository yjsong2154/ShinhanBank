import styled from "styled-components";

export const Container = styled.section`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CharacterWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  // Character 컴포넌트에 크기 제약
`;

export const InfoWrapper = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

export const ProgressInfo = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0;
`;
