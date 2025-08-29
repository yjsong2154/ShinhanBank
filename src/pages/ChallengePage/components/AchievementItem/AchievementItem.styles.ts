import styled from 'styled-components';

export const Container = styled.div<{ isCompleted: boolean }>`
  border: 1px solid ${({ isCompleted, theme }) => isCompleted ? theme.colors.primary : '#ccc'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  opacity: ${({ isCompleted }) => isCompleted ? 0.7 : 1};
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
`;

export const Description = styled.p`
  margin: 0 0 16px 0;
`;

export const RewardContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const RewardBox = styled.div`
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 4px;
`;

export const RewardName = styled.span``;

export const CompletedLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;
