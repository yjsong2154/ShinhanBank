import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage";
import SavingsDetailPage from "./pages/SavingsDetailPage";
import ChallengePage from "./pages/ChallengePage";
import MyPage from "./pages/MyPage";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import SavingsSettingsPage from "./pages/SavingsSettingsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();

  const location = useLocation();
  const shouldHideFooter = location.pathname === "/login";

  const isLoggedIn =
    typeof window !== "undefined" &&
    sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <StyledThemeProvider theme={theme}>
      <div
        style={{
          paddingBottom: shouldHideFooter ? 0 : "60px",
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/savings"
            element={
              isLoggedIn ? (
                <SavingsDetailPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/challenge"
            element={
              isLoggedIn ? <ChallengePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/mypage"
            element={isLoggedIn ? <MyPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/notifications"
            element={
              isLoggedIn ? (
                <NotificationPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <SavingsSettingsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/privacy-policy"
            element={
              isLoggedIn ? (
                <PrivacyPolicyPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/terms-of-service"
            element={
              isLoggedIn ? (
                <TermsOfServicePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/account-settings"
            element={
              isLoggedIn ? (
                <AccountSettingsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        {!shouldHideFooter && <Footer />}
      </div>
    </StyledThemeProvider>
  );
}

export default App;
