import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ProgressGlobal } from "./styles/ProgressGlobal";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Footer from "./components/Footer/Footer";
import NewBucketStart from "./pages/Buckets/NewBucketStart";
import FixedSavingInput from "./pages/Buckets/FixedSavingInput";
import PdfViewer from "./pages/Buckets/PdfViewer";
import FinalConfirm from "./pages/Buckets/FinalConfirm";
import Complete from "./pages/Buckets/Complete";
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
import AnimationPage from "./animation/AnimationPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BucketInfoInput from "./pages/Buckets/BucketInfoInput";
import CharacterSetup from "./pages/Buckets/CharacterSetup";
import AchievementModalHost from "./components/AchievementModal/AchievementModalHost";
import LoadingPage from "./pages/LoadingPage";

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
  const shouldHideFooter =
    location.pathname === "/login" || location.pathname.startsWith("/buckets/");

  const isLoggedIn =
    typeof window !== "undefined" &&
    sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <ProgressGlobal />
      <ScrollToTop />
      <AchievementModalHost />
      <div
        style={{
          paddingBottom: shouldHideFooter
            ? 0
            : "calc(60px + env(safe-area-inset-bottom))",
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <Routes>
          {/* 임시 애니메이션 페이지 */}
          <Route path="/animation" element={<AnimationPage />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/loading"
            element={
              isLoggedIn ? <LoadingPage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/"
            element={
              isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/savings/:id"
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
            path="/save-settings/:id"
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
          <Route
            path="/buckets/fixed"
            element={
              isLoggedIn ? <NewBucketStart /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/info"
            element={
              isLoggedIn ? (
                <BucketInfoInput />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/buckets/fixed/input"
            element={
              isLoggedIn ? (
                <FixedSavingInput />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/buckets/character-setup"
            element={
              isLoggedIn ? <CharacterSetup /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/pdf/:docId"
            element={
              isLoggedIn ? <PdfViewer /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/final-confirm"
            element={
              isLoggedIn ? <FinalConfirm /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/complete"
            element={
              isLoggedIn ? <Complete /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/flexible"
            element={
              isLoggedIn ? <NewBucketStart /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/buckets/td"
            element={
              isLoggedIn ? <NewBucketStart /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
        {!shouldHideFooter && <Footer />}
      </div>
    </StyledThemeProvider>
  );
}

export default App;
