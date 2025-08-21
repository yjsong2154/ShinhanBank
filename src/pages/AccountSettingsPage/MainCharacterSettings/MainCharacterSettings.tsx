import { useState } from "react";
import { selectableCharacters } from "../../../api/mockData";
import Character from "../../../components/Character/Character";
import * as S from "./MainCharacterSettings.styles";

const MainCharacterSettings = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
    // characterInfo.id
    "0"
  );

  const handleCharacterSelect = (id: string) => {
    // TODO: 선택된 캐릭터를 서버에 저장하는 API 호출 로직
    setSelectedCharacterId(id);
    console.log(`캐릭터 선택: ${id}`);
  };

  const mainCharacter = selectableCharacters.find(
    (char) => char.id === selectedCharacterId
  );

  return (
    <S.Container>
      <S.SectionTitle>메인 캐릭터 설정</S.SectionTitle>

      <S.MainCharacterWrapper>
        {mainCharacter && <Character id="0" />}
      </S.MainCharacterWrapper>

      <S.CharacterGrid>
        {selectableCharacters.map((char) => (
          <S.CharacterOption
            key={char.id}
            $isSelected={char.id === selectedCharacterId}
            onClick={() => handleCharacterSelect(char.id)}
          >
            <S.CharacterImage src={char.imageUrl} alt={char.name} />
            <S.CharacterName>{char.name}</S.CharacterName>
          </S.CharacterOption>
        ))}
      </S.CharacterGrid>
    </S.Container>
  );
};

export default MainCharacterSettings;
