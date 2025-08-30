import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styles";
import { API_URL } from "../../api/config";
import { dispatchAchievementUnlocked } from "../../utils/achievementEvent";

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  // 아이디 입력값 상태
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  // 페이지 이동을 위한 내비게이트 훅
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!userId) {
      setError("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/logIn`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userId }),
      });

      const responseData = await response.json();

      if (response.ok) {
        sessionStorage.setItem("isLoggedIn", "true");
        // 200 또는 202 응답 처리
        if (response.status === 200) {
          sessionStorage.setItem("user_id", responseData.user.id);
        } else if (response.status === 202) {
          // 업적 달성 응답 처리: 전역 모달 이벤트 발생
          const first = responseData.achievements?.list?.[0] || null;
          if (first) {
            const title = first.title || "";
            const itemName = first.rewards?.[0]?.itemName || "";
            const message =
              responseData.message || "축하합니다! 새로운 업적을 달성했습니다!";
            dispatchAchievementUnlocked({
              message,
              title,
              itemName,
              raw: responseData,
            });
          }
        }
        navigate("/loading", {
          replace: true,
          state: { nextPath: "/", delayMs: 2000 },
        });
      } else {
        // 오류 처리
        setError(responseData.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("서버 연결에 실패하였습니다.");
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>로그인</S.Title>
        <S.Subtitle>아이디를 입력해 주세요.</S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <div>
            <S.Label htmlFor="userId">아이디</S.Label>
            <S.Input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
            />
          </div>

          {error && (
            <S.HelperText style={{ color: "red" }}>{error}</S.HelperText>
          )}

          <S.LoginButton type="submit">로그인</S.LoginButton>
        </S.Form>

        <S.HelperText>테스트용 아이디를 입력하여 로그인하세요.</S.HelperText>
      </S.Card>
    </S.Container>
  );
};

export default LoginPage;
