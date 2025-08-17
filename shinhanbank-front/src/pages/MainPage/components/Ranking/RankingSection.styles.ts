import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
`;

export const TitleIcon = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

export const RankingList = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
`;