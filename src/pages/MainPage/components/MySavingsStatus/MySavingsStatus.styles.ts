import styled from 'styled-components';

export const Container = styled.section`
  padding: 15px;
  background-color: #f7f6ff;
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

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 10px;
`;

export const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CountNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const CountText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0;
`;

export const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AmountNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const AmountText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0;
`;

export const Alert = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #ff5c5c;
`;

export const AlertIcon = styled.span`
  margin-right: 5px;
`;