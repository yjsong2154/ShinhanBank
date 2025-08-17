import styled from 'styled-components';

export const Container = styled.section`
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
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

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextWrapper = styled.div`
  flex: 1;
  padding-right: 10px;
`;

export const ChallengeTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

export const ChallengeDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px;
`;

export const ChallengeInfo = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  span:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
`;