import styled from 'styled-components';

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