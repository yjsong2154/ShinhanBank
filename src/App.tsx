import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import SavingsDetailPage from './pages/SavingsDetailPage';
import ChallengePage from './pages/ChallengePage';
import MyPage from './pages/MyPage';
import NotificationPage from './pages/NotificationPage';
import LoginPage from './pages/LoginPage';
 

function App() {
  // 현재 경로에 따라 하단 푸터 표시 여부를 제어하기 위해 location 정보를 사용합니다.
  // 로그인 페이지에서는 푸터를 숨겨서 집중도 있는 화면을 제공합니다.
  const location = useLocation();
  const shouldHideFooter = location.pathname === '/login';
  
  // 프론트 전용 간단한 로그인 상태. 세션 스토리지의 플래그를 사용합니다.
  const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('isLoggedIn') === 'true';

  return (
    <ThemeProvider theme={theme}>
        <div style={{ paddingBottom: shouldHideFooter ? 0 : '60px', margin: '0 auto', maxWidth: '500px' }}>
          {/* 라우팅 구성: 최초 접근 시 로그인 페이지가 보이도록 기본 경로를 /login 으로 설정합니다. */}
          <Routes>
            {/* 로그인 페이지: 로그인 상태면 메인으로 리디렉션합니다. */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />} />

            {/* 보호 라우트: 로그인하지 않으면 /login 으로 보냅니다. */}
            <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />} />
            <Route path="/savings" element={isLoggedIn ? <SavingsDetailPage /> : <Navigate to="/login" replace />} />
            <Route path="/challenge" element={isLoggedIn ? <ChallengePage /> : <Navigate to="/login" replace />} />
            <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <Navigate to="/login" replace />} />
            <Route path="/notifications" element={isLoggedIn ? <NotificationPage /> : <Navigate to="/login" replace />} />
          </Routes>
          {!shouldHideFooter && <Footer />}
        </div>
    </ThemeProvider>
  );
}

export default App;