import React from 'react';
import * as S from './Character.styles';

interface CharacterProps {
  characterUrl: string;
  backgroundUrl: string;
  clothesUrl?: string;     // 옷, 소품은 선택적(optional)으로 받을 수 있게 합니다.
  accessoryUrl?: string;
}

const CharacterCall: React.FC<CharacterProps> = ({ characterUrl, backgroundUrl, clothesUrl, accessoryUrl }) => {
  return (
    <S.Container backgroundUrl={backgroundUrl}>
      <S.CharacterImage src={characterUrl} alt="캐릭터" />
      {clothesUrl && <S.ClothesImage src={clothesUrl} alt="옷" />}
      {accessoryUrl && <S.AccessoryImage src={accessoryUrl} alt="소품" />}
    </S.Container>
  );
};

export default CharacterCall;