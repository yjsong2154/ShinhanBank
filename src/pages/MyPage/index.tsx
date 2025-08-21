import * as S from "./MyPage.styles";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import MyCharacter from "./components/MyCharacter/MyCharacter";
import MySavingsList from "./components/MySavingsList/MySavingsList";
import ChallengeHistory from "./components/ChallengeHistory/ChallengeHistory";

const MyPage = () => {
  // 내비게이션 훅: 로그아웃 후 로그인 화면으로 이동하기 위해 사용합니다.
  const navigate = useNavigate();

  // 로그아웃 처리 핸들러
  // - 세션 스토리지에서 로그인 플래그를 제거하고 로그인 화면으로 이동합니다.
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

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
        <S.SettingItem onClick={() => navigate("/account-settings")}>
          계정 관리
        </S.SettingItem>
        <S.SettingItem onClick={() => navigate("/privacy-policy")}>
          개인정보 처리방침
        </S.SettingItem>
        <S.SettingItem onClick={() => navigate("/terms-of-service")}>
          이용 약관
        </S.SettingItem>
        {/* 로그아웃: 클릭 시 세션 상태를 제거하고 로그인 화면으로 이동합니다. */}
        <S.LogoutItem onClick={handleLogout}>로그아웃</S.LogoutItem>
      </S.AccountSetting>
    </S.Container>
  );
};

export default MyPage;
