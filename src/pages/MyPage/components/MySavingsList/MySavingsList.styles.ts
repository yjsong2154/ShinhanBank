import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

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
  gap: 12px;
`;

/* 카드 전체: 클릭 = Link */
export const SavingsItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f7f6ff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  text-decoration: none;
  color: inherit;
`;

/* ── 상단 헤더: 좌(아바타+이름/시간) · 우(상태+리액션) ── */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #9a77ff;
  display: grid;
  place-items: center;

  img,
  svg {
    width: 44px;
    height: 44px;
  }
`;

export const Name = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Time = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-top: 2px;
`;

export const RightMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Status = styled.span<{ $isCompleted: boolean }>`
  font-size: 12px;
  font-weight: 700;
  padding: 5px 9px;
  border-radius: 999px;

  background-color: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.lightGray : "#9a77ff"};

  color: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.text : theme.colors.white};
`;

/* 우측 좋아요/댓글 */
export const Reactions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Reaction = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};

  img {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

/* ── 본문: 설명 ── */
export const Desc = styled.p`
  margin-bottom: 10px;
  font-size: 15px;
  color: #4a4a4a;
  line-height: 1.35;

  /* 한 줄 말줄임 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* 금액 표시 */
export const AmountInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 6px;
  font-weight: 600;
`;

export const CurrentAmount = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const TargetAmount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

/* ── 하단: 진행바 + % + 기간 ── */
export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 15px;
  flex: 1;
  border-radius: 999px;
  background: #e5e3f3;
  overflow: hidden;
  margin-right: 10px;
`;

// ⬇️ 0% → $progress% 까지 차오르는 키프레임
const fill = (to: number) => keyframes`
  from { width: 0%; }
  to   { width: ${to}%; }
`;

// ⬇️ 기존 Progress 교체
export const Progress = styled.div<{ $progress: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  background: #9a77ff;
  border-radius: 999px;

  /* 값 클램프 */
  ${({ $progress }) => {
    const to = Math.max(0, Math.min(100, $progress));
    return css`
      animation: ${fill(to)} 900ms ease-out forwards;
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
    transition: width 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.35),
      transparent
    );
    transform: translateX(-100%);
    animation: shine 2.3s ease-out 0.15s forwards;
  }
  @keyframes shine {
    to {
      transform: translateX(100%);
    }
  }
`;

export const PercentLabel = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
`;

export const Period = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
`;

export const NewButton = styled.button`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 25px;
  padding: 10px 15px;
  border: 2px solid #9a77ff;
  border-radius: 20px;
  background: #fff;
  color: #9a77ff;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #9a77ff;
    color: #fff;
  }
  &:active {
    transform: translateY(1px);
  }
`;
