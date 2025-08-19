import styled from 'styled-components';

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export const Type = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin: 0 0 10px;
`;

export const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  align-self: flex-end;
`;