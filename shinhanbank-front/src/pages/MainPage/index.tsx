// import { useNavigate } from 'react-router-dom'; //저축통 버튼 관련
import * as S from "./MainPage.styles";
import ChallengeCard from "./components/ChallengeCard/ChallengeCard";
import MySavingsStatus from "./components/MySavingsStatus/MySavingsStatus";
import RankingSection from "./components/Ranking/RankingSection";
import FeedSection from "./components/Feed/FeedSection";

const MainPage = () => {
  // const navigate = useNavigate(); //저축통 버튼 관련

  const handleCreateSavings = () => {
    // TODO: '새 저축통 만들기' 페이지로 이동하는 로직을 여기에 추가합니다.
    console.log("새 저축통 만들기 버튼 클릭됨");
    // navigate('/create-savings');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>적금통 키우기</S.Title>
        {/* TODO: 알림 아이콘, 프로필 이미지 컴포넌트 추가 */}
      </S.Header>

      <ChallengeCard />
      <MySavingsStatus />
      <RankingSection />
      <FeedSection />

      <S.CreateSavingsButton onClick={handleCreateSavings}>
        + 새 저축통 만들기
      </S.CreateSavingsButton>
      {/* TODO: 로그아웃 버튼 컴포넌트 추가 */}
    </S.Container>
  );
};

export default MainPage;
