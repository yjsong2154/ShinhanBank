import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 20px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const SavingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SavingsItem = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
`;

export const SavingsInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Status = styled.span<{ $isCompleted: boolean }>`
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  align-self: flex-start;
  margin-bottom: 8px;
  background-color: ${props => props.$isCompleted ? props.theme.colors.lightGray : props.theme.colors.primary};
  color: ${props => props.$isCompleted ? props.theme.colors.text : props.theme.colors.white};
`;

export const SavingsTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const AmountInfo = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

export const CurrentAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const TargetAmount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressBar = styled.div`
  flex-grow: 1;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-right: 10px;
`;

export const Progress = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  transition: width 0.3s ease-in-out;
`;

export const ProgressText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 5px;
`;

export const Period = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;