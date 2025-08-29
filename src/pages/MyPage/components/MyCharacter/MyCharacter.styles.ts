import styled, { keyframes, css } from "styled-components";

const sweep = (to: number) => keyframes`
  from { --p: 0; }
  to   { --p: ${to}; }
`;

export const Container = styled.section`
  padding: 18px 16px 24px;
  background: #f7f6ff;
  border-radius: 18px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -30% -10% auto -10%;
    height: 60%;
    pointer-events: none;
  }
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #473350;
  margin: 0 0 16px;
  letter-spacing: 0.2px;
`;

export const Ring = styled.div<{ $percent: number }>`
  --size: clamp(120px, 34vw, 160px);
  --thickness: 10px;
  --bg: #efeafc;
  --fg: #9a77ff;

  width: var(--size);
  height: var(--size);
  margin: 0 auto 12px;
  position: relative;
  border-radius: 50%;
  display: grid;
  place-items: center;

  background: conic-gradient(var(--bg) 0 100%) padding-box,
    radial-gradient(#fff 59%, transparent 60%) border-box;
  border: var(--thickness) solid transparent;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: var(--thickness);
    background: conic-gradient(var(--fg) calc(var(--p) * 1%), transparent 0)
        border-box,
      radial-gradient(#fff 59%, transparent 60%) padding-box;
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - var(--thickness) - 1px),
      #000 0
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - var(--thickness) - 1px),
      #000 0
    );
    animation: ${({ $percent }) =>
      css`
        ${sweep($percent)} 900ms ease-out forwards
      `};
  }
`;

export const CharacterWrapper = styled.div`
  width: calc(var(--size) - var(--thickness) * 2);
  height: calc(var(--size) - var(--thickness) * 2);
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e6e2ff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px rgba(154, 119, 255, 0.18);

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CharacterInfo = styled.div`
  display: grid;
  gap: 6px;
  place-items: center;
`;

export const CharacterName = styled.span`
  font-size: 18px;
  font-weight: 750;
  color: #473350;
  margin-bottom: 10px;
`;

export const LevelBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 800;
  color: #6c56b0;
  background: rgba(154, 119, 255, 0.14);
  border: 1px solid rgba(154, 119, 255, 0.22);
`;

export const PointInfo = styled.div`
  margin-top: 10px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ede9fe;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

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
    animation: shine 1.1s ease-out 0.2s forwards;
  }
  @keyframes shine {
    to {
      transform: translateX(100%);
    }
  }
`;

export const Point = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #473350;
  margin-bottom: 4px;
`;

export const NextLevel = styled.span`
  font-size: 12px;
  color: #84708d;
`;
