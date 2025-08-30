import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  padding: 20px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const StatsContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px 16px;
  //background-color: #7c70e8;
  background-color: #262141;
  border-radius: 15px;
`;

export const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
`;

export const StatsTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

export const StatsSub = styled.div`
  font-size: 13px;
  color: #fafafa;
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 13px;
  border-radius: 999px;
  background: #e5e3f3;
  overflow: hidden;
`;

/* width: 0 → % 로 채우는 키프레임 (prop 기반) */
const fill = (to: number) => keyframes`
  from { width: 0%; }
  to   { width: ${Math.max(0, Math.min(100, to))}%; }
`;

/* === 실제 채움 막대 === */
export const ProgressFill = styled.div<{ $progress: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  border-radius: inherit;
  will-change: width, transform;

  /* 그라데이션 (요청 톤) */
  background: linear-gradient(
    90deg,
    rgba(97, 104, 251, 0.85) 0%,
    rgba(145, 105, 240, 0.9) 50%,
    rgba(200, 97, 229, 0.85) 100%
  );

  /* 마운트 시 채우기 애니메이션 (prop 바뀌면 신규 keyframes로 재시작) */
  animation: ${({ $progress }) =>
    css`
      ${fill($progress)} 900ms ease-out forwards
    `};

  /* 모션 감소 */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    width: ${({ $progress }) => `${Math.max(0, Math.min(100, $progress))}%`};
  }

  /* 하이라이트가 한번 스르륵 지나가는 효과 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent
    );
    transform: translateX(-100%);
    animation: shine 2.3s ease-out 0.15s forwards;
    pointer-events: none;
    mix-blend-mode: screen;
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
  color: #262141;
`;

export const AchievementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
