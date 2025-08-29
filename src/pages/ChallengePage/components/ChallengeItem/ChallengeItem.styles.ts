import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 15px;
  margin-bottom: 15px;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 15px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px;
  line-height: 1.4;
`;

export const InfoWrapper = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 10px;
  span:first-child {
    margin-right: 10px;
  }
`;

export const Participants = styled.span``;

export const Period = styled.span``;

export const Reward = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
  white-space: nowrap;
`;