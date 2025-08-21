import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styles";

// 로그인 페이지 컴포넌트
// - 실제 인증 로직 없이, 아이디/비밀번호 입력 후 로그인 버튼을 누르면 메인 페이지로 이동합니다.
// - 첫 진입 시 이 페이지가 보이도록 라우팅에서 기본 경로를 로그인으로 설정합니다.
const LoginPage = () => {
  // 아이디와 비밀번호 입력값 상태
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // 페이지 이동을 위한 내비게이트 훅
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출. 실제 인증 없이 메인 페이지로 이동합니다.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // 실제 기능은 구현하지 않으므로, 입력값 검증 없이 바로 메인 페이지로 이동합니다.
    // 프론트 전용 목업 상태를 설정하여 보호 라우트를 통과하도록 합니다.
    sessionStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>로그인</S.Title>
        <S.Subtitle>아이디와 비밀번호를 입력해 주세요.</S.Subtitle>

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

          <div>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <S.LoginButton type="submit">로그인</S.LoginButton>
        </S.Form>

        <S.HelperText>테스트용 로그인 화면입니다. 실제 인증은 수행하지 않습니다.</S.HelperText>
      </S.Card>
    </S.Container>
  );
};

export default LoginPage;


