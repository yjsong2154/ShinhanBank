// import { useNavigate } from 'react-router-dom'; //저축통 버튼 관련
import * as S from './MainPage.styles'
import ChallengeCard from './components/ChallengeCard/ChallengeCard';
import MySavingsStatus from './components/MySavingsStatus/MySavingsStatus';

const MainPage = () => {
  // const navigate = useNavigate(); //저축통 버튼 관련

  const handleCreateSavings = () => {
    // TODO: '새 저축통 만들기' 페이지로 이동하는 로직을 여기에 추가합니다.
    console.log('새 저축통 만들기 버튼 클릭됨');
    // navigate('/create-savings');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>저축 챌린지</S.Title>
        {/* TODO: 알림 아이콘, 프로필 이미지 컴포넌트 추가 */}
      </S.Header>

      <ChallengeCard />
      <MySavingsStatus />
      {/* TODO: 랭킹 섹션 컴포넌트 */}
      {/* TODO: 최신 글, 인기 글 섹션 컴포넌트 */}

      <S.CreateSavingsButton onClick={handleCreateSavings}>
        + 새 저축통 만들기
      </S.CreateSavingsButton>
      {/* TODO: 로그아웃 버튼 컴포넌트 추가 */}
    </S.Container>
  );
};

export default MainPage;