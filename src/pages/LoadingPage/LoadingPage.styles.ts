import styled, { keyframes, css } from "styled-components";

/* 배경 흐름 */
const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
`;

export const Container = styled.div`
  padding: 20px 20px;
  max-width: 500px;
  margin: 0 auto;

  background: linear-gradient(
    135deg,
    rgba(97, 104, 251, 0.44) 0%,
    rgba(145, 105, 240, 0.45) 50%,
    rgba(200, 97, 229, 0.46) 100%
  );
  background-size: 200% 200%;
  animation: ${shimmer} 8s ease-in-out infinite;

  min-height: 100vh;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-size: 100% 100%;
  }
`;

export const Mascot = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.12));
  margin-bottom: 20px;
`;

/* 타자 로더 공통 */
const typing = keyframes`
  to { clip-path: inset(0 -1ch 0 0); }
`;

export const TextBox = styled.div`
  display: grid;
  gap: 6px;
  text-align: center;
`;

/* 각 줄 로더: 글자 수(steps), 지연(delay) 제어 */
export const TextLoaderLine = styled.div<{
  $text: string;
  $steps?: number;
  $delayMs?: number;
  $durationMs?: number;
}>`
  width: fit-content;
  margin: 0 auto;
  font-weight: 900;
  font-size: clamp(16px, 5.2vw, 24px);
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #fff;

  clip-path: inset(0 100% 0 0);
  will-change: clip-path;

  ${({ $steps = 24, $delayMs = 0, $durationMs = 1200 }) => css`
    /* ✅ 1회 재생 + 마지막 프레임 유지(both) + steps(..., end) */
    animation: ${typing} ${$durationMs}ms steps(${$steps}, end) both;
    animation-delay: ${$delayMs}ms;
  `}

  &::before {
    content: "${({ $text }) => $text}";
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    clip-path: inset(0 -1ch 0 0); /* 전부 보이게 */
  }
`;
