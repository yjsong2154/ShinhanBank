import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

export const Dot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  border: 1px solid white;
`;