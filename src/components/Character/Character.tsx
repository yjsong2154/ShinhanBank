import * as S from './Character.styles';
import useCharacter from '../../hooks/useCharacter';
import CharacterCall from './CharacterCall';

interface CharacterId {
  id: string;
}

const Character: React.FC<CharacterId> = ({ id }) => {
  const { data: characterData, loading: characterLoading, error: characterError } = useCharacter(id);

  if (characterLoading) {
    return <S.FreeContainer>캐릭터 정보를 불러오는 중...</S.FreeContainer>;
  }

  if (characterError || !characterData) {
    return <S.FreeContainer>캐릭터 정보를 불러오지 못했습니다.</S.FreeContainer>;
  }

  return (
    <S.FreeContainer>
      <CharacterCall
        characterUrl={characterData.characterUrl}
        backgroundUrl={characterData.backgroundUrl}
        clothesUrl={characterData.clothesUrl}
        accessoryUrl={characterData.accessoryUrl}
      />
    </S.FreeContainer>
  );
};

export default Character;