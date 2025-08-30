import useUserInfo from "../../../../hooks/useUserInfo";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import AvatarSOL from "../../../../components/AvatarSOL/AvatarSOL";
import * as S from "./MyCharacter.styles";

type Char = 1 | 2 | 3 | 10 ;
type Cloth = 0| 6 | 5 | 4 | 11 ;
type Item = 0 | 7 | 8 | 9 | 12 ;

function toChar(n: number): Char {
  if (n === 1 || n === 2 || n === 3 || n === 10) return n;
  return 1;
}

function toCloth(n: number): Cloth {
  if (n === 0 || n === 6 || n === 5 || n === 4 || n === 11) return n;
  return 0;
}

function toItem(n: number): Item {
  if (n === 0 || n === 7 || n === 8 || n === 9 || n === 12) return n;
  return 0;
}

const MyCharacter = () => {
  const userId = sessionStorage.getItem("user_id");
  const { data: user, loading, error } = useUserInfo(userId || "");

  if (loading)
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );
  if (error) return <S.Container>Error: {error}</S.Container>;
  if (!user)
    return <S.Container>사용자 정보를 불러올 수 없습니다.</S.Container>;

  console.log("User Data in MyCharacter:", user.point);

  const point = user.point;
  const level = Math.floor(point / 1000);          // 1000으로 나눈 몫
  const remainder = point % 1000;                 // 1000으로 나눈 나머지
  const nextLevelPoints = 1000 - remainder;       // 다음 레벨까지 남은 포인트
  const percent = (remainder / 1000) * 100;   

  return (
    <S.Container>
      <S.Title>나의 저축 캐릭터</S.Title>

      <S.Ring $percent={Math.min(100, Math.max(0, percent))}>
        <S.CharacterWrapper>
          <AvatarSOL size={250} character={toChar(user.character.character_item.id)} cloth={toCloth(user.character.outfit_item.id)} hat={toItem(user.character.hat_item.id)} />
        </S.CharacterWrapper>
      </S.Ring>

      <S.CharacterInfo>
        <S.CharacterName>{user.character.character_item.name}</S.CharacterName>
        <S.LevelBadge>Lv.{level}</S.LevelBadge>

        <S.PointInfo>
          <S.Point>{user.point}P</S.Point>
          <S.NextLevel>다음 레벨까지 {nextLevelPoints}P 남았어요</S.NextLevel>
        </S.PointInfo>
      </S.CharacterInfo>
    </S.Container>
  );
};

export default MyCharacter;
