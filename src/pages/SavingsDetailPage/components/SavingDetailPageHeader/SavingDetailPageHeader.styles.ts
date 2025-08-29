import styled, { keyframes } from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &.animating img {
    animation: ${heartBeat} 0.5s ease-in-out;
  }
`;

export const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
`;
