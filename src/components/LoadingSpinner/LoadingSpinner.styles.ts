import styled, { keyframes, css } from "styled-components";

const bounce = keyframes`
  0%   { transform: scale(1);   opacity: 0.8; }
  50%  { transform: scale(2.1); opacity: 0.35; }
  100% { transform: scale(1);   opacity: 0.8; }
`;

const shimmer = keyframes`
  0%   { background-position:   0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const gradient = (angle: number) => css`
  linear-gradient(
    ${angle}deg,
    rgba(97, 104, 251, 0.44) 0%,
    rgba(145, 105, 240, 0.65) 50%, /* 채도 살짝 ↑ */
    rgba(200, 97, 229, 0.70) 100%
  )
`;

export const DotTrack = styled.div`
  display: flex;
  gap: 12px;
`;

export const Dot = styled.span<{ index: number }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  ${({ index }) => css`
    background-image: ${gradient(60 + index * 15)};
    background-size: 300% 300%;
    animation: ${bounce} 1.45s ease-in-out ${0.15 * (index + 1)}s infinite,
      ${shimmer} 2.6s ease-in-out ${0.08 * (index + 1)}s infinite;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: ${bounce} 1.8s ease-in-out infinite;
    background-size: 100% 100%;
  }
`;

export const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
