/**
 * 업적 달성 모달 스타일 컴포넌트. 간단한 스케일/페이드 애니메이션을 포함합니다.
 */
import styled, { keyframes } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
`;

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

export const Container = styled.div`
  width: 320px;
  max-width: 88vw;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  padding: 20px 18px;
  text-align: center;
  animation: ${popIn} 160ms ease-out;
`;

export const Title = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

export const SubTitle = styled.div`
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
`;

export const RewardLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const RewardName = styled.div`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

export const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 40px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 120ms ease;
  &:active { filter: brightness(0.95); }
`;


