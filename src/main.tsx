import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 라우터 제공자: 애플리케이션 전체에서 라우팅 기능을 사용하기 위해 BrowserRouter로 감쌉니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
