// src/components/RankingItem/RankingItem.styles.ts

import styled, { css } from "styled-components";

// 1. Container가 $isMe prop을 받도록 수정하고, 해당 prop이 true일 때 적용할 스타일 추가
export const Container = styled.div<{ $striped?: boolean; $isMe?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 25px;
  gap: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease-in-out;

  /* 기본 배경색 (줄무늬) */
  background: ${({ $striped }) => ($striped ? "#F8F7FD" : "#FFFFFF")};

  /* isMe prop이 true일 경우 스타일 덮어쓰기 */
  ${({ $isMe, theme }) =>
    $isMe &&
    css`
      background: #e9efff; /* 눈에 띄는 다른 배경색 */
      border: 1.5px solid ${theme.colors.main};
      border-radius: 8px;
      font-weight: 600; /* 폰트 강조 */
    `}

  &:last-child {
    border-bottom: none;
  }
`;

export const Rank = styled.span`
  width: 25px;
  font-size: 1.1rem;
  font-weight: 800;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPoint};
`;

export const LogoWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Name = styled.span`
  flex: 1;
  font-weight: 500;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textBody};
`;

// 2. 점수와 왕관 아이콘을 정렬하기 위해 flex 속성 추가
export const Amount = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textBody};
`;

export const CrownIcon = styled.img`
  width: 22px;
  height: 22px;
`;