import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import SavingsDetailPage from './pages/SavingsDetailPage';
import ChallengePage from './pages/ChallengePage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div style={{ paddingBottom: '60px' }}> {/* Footer 높이만큼 패딩 추가 */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/savings" element={<SavingsDetailPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;