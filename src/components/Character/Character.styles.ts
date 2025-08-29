import styled from 'styled-components';

export const Container = styled.div<{ backgroundUrl: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${props => props.backgroundUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FreeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const CharacterImage = styled.img`
  width: 70%;
  height: auto;
  position: absolute;
`;

export const ClothesImage = styled.img`
  width: 70%;
  height: auto;
  position: absolute;
`;

export const AccessoryImage = styled.img`
  width: 70%;
  height: auto;
  position: absolute;
`;

export const ProgressIndicator = styled.div<{ progress: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.progress >= 100 ? 'green' : props.theme.colors.primary)};
`;