/**
 * 마이페이지에서 사용자 캐릭터를 렌더링합니다. 공통 `Character` 컴포넌트를 사용합니다.
 */
import useUserInfo from "../../../../hooks/useUserInfo";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Character from "../../../../components/Character/Character";
import * as S from "./MyCharacter.styles";

// 캐릭터 렌더링은 MySavingsList와 동일한 방식(숫자 변환)으로 처리

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
          <Character
            character={parseInt(String(user.character.character_item.id))}
            cloth={parseInt(String(user.character.outfit_item.id))}
            hat={parseInt(String(user.character.hat_item.id))}
          />
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
