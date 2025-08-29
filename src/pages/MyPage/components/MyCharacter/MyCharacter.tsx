import { myPageData } from '../../../../api/mockData';
import Character from '../../../../components/Character/Character';
import * as S from './MyCharacter.styles';

const MyCharacter = () => {
  const { name, level, points, nextLevelPoints } = myPageData.character;

  return (
    <S.Container>
      <S.Title>나의 저축 캐릭터</S.Title>
      <S.CharacterWrapper>
        <Character id='0' />
      </S.CharacterWrapper>
      <S.CharacterInfo>
        <S.CharacterName>{name}</S.CharacterName>
        <S.CharacterLevel>Lv.{level}</S.CharacterLevel>
        <S.PointInfo>
          <S.Point>{points}P</S.Point>
          <S.NextLevel>
            다음 레벨까지 {nextLevelPoints}P 남았어요
          </S.NextLevel>
        </S.PointInfo>
      </S.CharacterInfo>
    </S.Container>
  );
};

export default MyCharacter;