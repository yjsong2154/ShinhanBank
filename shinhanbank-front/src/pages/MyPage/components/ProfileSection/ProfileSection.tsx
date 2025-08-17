import * as S from './ProfileSection.styles';
import { myProfile } from '../../../../api/mockData'; // mockData 직접 불러오기

const ProfileSection = () => {
  return (
    <S.Container>
      <S.ProfileInfoWrapper>
        <S.Name>{myProfile.name}</S.Name>
        <S.StudentId>{myProfile.studentId}</S.StudentId>
      </S.ProfileInfoWrapper>
      <S.DetailInfoWrapper>
        <S.InfoBox>
          <S.InfoTitle>소속 대학</S.InfoTitle>
          <S.InfoContent>{myProfile.university}</S.InfoContent>
        </S.InfoBox>
        <S.InfoBox>
          <S.InfoTitle>연결 계좌</S.InfoTitle>
          <S.InfoContent>{myProfile.linkedAccount}</S.InfoContent>
        </S.InfoBox>
      </S.DetailInfoWrapper>
    </S.Container>
  );
};

export default ProfileSection;