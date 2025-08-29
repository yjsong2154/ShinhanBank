import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 10px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const StatsContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export const AchievementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
