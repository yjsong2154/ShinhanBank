import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * 페이지 이동 시 스크롤을 최상단으로 이동시키는 컴포넌트.
 * 브라우저의 '뒤로가기' 또는 '앞으로가기' 버튼 클릭 시에는 동작하지 않아
 * 이전 스크롤 위치를 유지합니다.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // POP 이벤트(뒤로가기/앞으로가기)가 아닐 경우에만 스크롤을 최상단으로 이동
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]); // 경로 또는 이동 유형이 변경될 때마다 실행

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default ScrollToTop;
