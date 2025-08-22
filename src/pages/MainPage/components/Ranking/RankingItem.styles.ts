import styled from "styled-components";

export const Container = styled.div<{ $striped?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 25px;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: ${({ $striped }) => ($striped ? "#E6DFFB" : "#f7f6ff")};
  &:last-child {
    border-bottom: none;
  }
`;

export const Rank = styled.span`
  width: 25px;
  font-weight: 800;
  text-align: center;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const Name = styled.span`
  flex: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const Amount = styled.span`
  margin-left: auto;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const CrownIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
