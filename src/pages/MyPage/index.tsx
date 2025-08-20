import * as S from './MyPage.styles';
import ProfileSection from './components/ProfileSection/ProfileSection';
import MyCharacter from './components/MyCharacter/MyCharacter';
import MySavingsList from './components/MySavingsList/MySavingsList';
import ChallengeHistory from './components/ChallengeHistory/ChallengeHistory';

const MyPage = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>마이페이지</S.Title>
        {/* TODO: 알림 아이콘 컴포넌트 추가 */}
      </S.Header>

      <ProfileSection />
      <MyCharacter />
      <MySavingsList />
      <ChallengeHistory />

      <S.AccountSetting>
        <S.SettingItem>계정 관리</S.SettingItem>
        <S.SettingItem>알림 설정</S.SettingItem>
        <S.SettingItem>개인정보 처리방침</S.SettingItem>
        <S.SettingItem>이용 약관</S.SettingItem>
        <S.LogoutItem>로그아웃</S.LogoutItem>
      </S.AccountSetting>
    </S.Container>
  );
};

export default MyPage;