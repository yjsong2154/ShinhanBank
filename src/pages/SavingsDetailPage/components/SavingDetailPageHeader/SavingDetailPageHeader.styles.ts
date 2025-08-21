import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
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