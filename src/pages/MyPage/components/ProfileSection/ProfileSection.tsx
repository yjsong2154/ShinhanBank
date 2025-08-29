import * as S from './ProfileSection.styles';
import useUserInfo from '../../../../hooks/useUserInfo';
import { USER_ID } from '../../../../api/config';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const ProfileSection = () => {
  // USER_ID가 null일 경우를 대비하여 빈 문자열을 전달합니다.
  const { data: user, loading, error } = useUserInfo(USER_ID || '');
  console.log("user", user);

  if (loading) {
    // 로딩 중일 때 보여줄 UI
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );
  }

  if (error) {
    // 에러 발생 시 보여줄 UI
    return <S.Container>Error: {error}</S.Container>;
  }

  if (!user) {
    // 사용자 정보가 없을 때 보여줄 UI
    return <S.Container>사용자 정보를 불러올 수 없습니다.</S.Container>;
  }

  return (
    <S.Container>
      <S.ProfileInfoWrapper>
        <S.Name>{user.nickname}</S.Name>
        {/* API 응답의 email을 학번 대신 사용합니다 */}
        <S.StudentId>{user.email}</S.StudentId>
      </S.ProfileInfoWrapper>
      <S.DetailInfoWrapper>
        <S.InfoBox>
          <S.InfoTitle>소속 대학</S.InfoTitle>
          <S.InfoContent>{user.university.name}</S.InfoContent>
        </S.InfoBox>
        {/* '연결 계좌' 정보는 현재 API 응답에 없으므로 제거되었습니다. */}
      </S.DetailInfoWrapper>
    </S.Container>
  );
};

export default ProfileSection;
