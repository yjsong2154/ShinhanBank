import * as S from "./ProfileSection.styles";
import useUserInfo from "../../../../hooks/useUserInfo";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { getUniversityLogo } from "../../../../utils/university";

const ProfileSection = () => {
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

  return (
    <S.Container>
      {/* ✅ 소속 대학 위쪽에 작게 */}
      <S.UniversityRow>
        <S.UnivLogo
          src={getUniversityLogo(user.university.id)}
          alt={`${user.university.name} 로고`}
        />
        <S.UniversityName>{user.university.name}</S.UniversityName>
      </S.UniversityRow>

      {/* ✅ 닉네임 + 이메일 */}
      <S.ProfileInfoWrapper>
        <S.Name>{user.nickname}</S.Name>
        <S.StudentId>{user.email}</S.StudentId>
      </S.ProfileInfoWrapper>
    </S.Container>
  );
};

export default ProfileSection;
