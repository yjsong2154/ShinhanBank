export const clearSession = () => {
  // 모든 쿠키 삭제
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // 로컬 스토리지 및 세션 스토리지 비우기
  localStorage.clear();
  sessionStorage.clear();
};

export const redirectToLogin = () => {
  window.location.href = "/login";
};

export const handleUnauthorized = () => {
  clearSession();
  redirectToLogin();
};
