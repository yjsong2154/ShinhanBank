import { useNavigate } from 'react-router-dom'; //저축통 버튼 관련
import * as S from "./MainPage.styles";
import ChallengeCard from "./components/ChallengeCard/ChallengeCard";
import MySavingsStatus from "./components/MySavingsStatus/MySavingsStatus";
import RankingSection from "./components/Ranking/RankingSection";
import FeedSection from "./components/Feed/FeedSection";
import NotificationIcon from "./components/NotificationIcon/NotificationIcon";

const MainPage = () => {
  const navigate = useNavigate(); //저축통 버튼 관련

  const handleCreateSavings = () => {
    // TODO: '새 저축통 만들기' 페이지로 이동하는 로직을 여기에 추가합니다.
    navigate('/buckets');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>적금통 키우기</S.Title>
        <NotificationIcon hasNotification={true} />
      </S.Header>

      <ChallengeCard />
      <MySavingsStatus />
      <RankingSection />
      <FeedSection />

      <S.CreateSavingsButton onClick={handleCreateSavings}>
        + 새 저축통 만들기
      </S.CreateSavingsButton>
    </S.Container>
  );
};

export default MainPage;
