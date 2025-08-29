import { myPageData } from "../../../../api/mockData";
import Character from "../../../../components/Character/Character";
import * as S from "./MyCharacter.styles";

const MyCharacter = () => {
  const { name, level, points, nextLevelPoints } = myPageData.character;

  const totalForNext = Math.max(1, points + nextLevelPoints);
  const percent = Math.round((points / totalForNext) * 100);

  return (
    <S.Container>
      <S.Title>나의 저축 캐릭터</S.Title>

      <S.Ring $percent={Math.min(100, Math.max(0, percent))}>
        <S.CharacterWrapper>
          <Character id="0" />
        </S.CharacterWrapper>
      </S.Ring>

      <S.CharacterInfo>
        <S.CharacterName>{name}</S.CharacterName>
        <S.LevelBadge>Lv.{level}</S.LevelBadge>

        <S.PointInfo>
          <S.Point>{points}P</S.Point>
          <S.NextLevel>다음 레벨까지 {nextLevelPoints}P 남았어요</S.NextLevel>
        </S.PointInfo>
      </S.CharacterInfo>
    </S.Container>
  );
};

export default MyCharacter;
