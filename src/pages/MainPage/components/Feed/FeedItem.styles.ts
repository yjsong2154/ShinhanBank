import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const Author = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const Period = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

export const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px;
`;

export const ProgressInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 10px;
`;

export const ReactionInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const ReactionIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReactionCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;