import * as S from "./MyPage.styles";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import MyCharacter from "./components/MyCharacter/MyCharacter";
import MySavingsList from "./components/MySavingsList/MySavingsList";
// import ChallengeHistory from "./components/ChallengeHistory/ChallengeHistory";
import { API_URL } from "../../api/config";
import { useState } from "react";

const MyPage = () => {
  const [error, setError] = useState("");
  
  // 내비게이션 훅: 로그아웃 후 로그인 화면으로 이동하기 위해 사용합니다.
  const navigate = useNavigate();


  // 로그아웃 처리 핸들러
  // - 세션 스토리지에서 로그인 플래그를 제거하고 로그인 화면으로 이동합니다.
  const handleLogout = async () => {
    setError("");

      try {
        const response = await fetch(`${API_URL}/users/logout`, {
          method: "DELETE",
          credentials: 'include'
        });
  
        const responseData = await response.json();
        console.log("LogOut Response:", responseData);
  
        if (response.ok) {
          sessionStorage.removeItem("isLoggedIn");
          sessionStorage.removeItem("user_id")
          // 200 응답 처리
          if (response.status === 200) {
            navigate("/login", { replace: true });
          }
        } else {
          // 오류 처리
          setError(responseData.message || "로그아웃에 실패했습니다.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("서버 연결에 실패하였습니다.");
      }
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
      {/* <ChallengeHistory /> */}

      <S.AccountSetting>
        {/* <S.SettingItem onClick={() => navigate("/account-settings")}>
          계정 관리
        </S.SettingItem> */}
        <S.SettingItem onClick={() => navigate("/privacy-policy")}>
          개인정보 처리방침
        </S.SettingItem>
        <S.SettingItem onClick={() => navigate("/terms-of-service")}>
          이용 약관
        </S.SettingItem>
        {/* 로그아웃: 클릭 시 세션 상태를 제거하고 로그인 화면으로 이동합니다. */}
        <S.LogoutItem onClick={handleLogout}>로그아웃</S.LogoutItem>
        {error && <S.HelperText style={{ color: "red" }}>{error}</S.HelperText>}
      </S.AccountSetting>
    </S.Container>
  );
};

export default MyPage;
