import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const BigTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;


export const ChallengeList = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
`;

export const ChallengeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

export const ChallengeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Progress = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const ChallengeStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Period = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 5px;
`;

export const Reward = styled.span`
  font-size: 14px;
  font-weight: bold;
`;