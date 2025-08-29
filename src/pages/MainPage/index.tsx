import { useNavigate } from 'react-router-dom'; //저축통 버튼 관련
import * as S from "./MainPage.styles";
import ChallengeCard from "./components/ChallengeCard/ChallengeCard";
import MySavingsStatus from "./components/MySavingsStatus/MySavingsStatus";
import RankingSection from "./components/Ranking/RankingSection";
import FeedSection from "./components/Feed/FeedSection";
import NotificationIcon from "./components/NotificationIcon/NotificationIcon";
import { fetchNotifications } from "../../api/notifications";
import type { NotificationsResponse } from "../../api/notifications";
import useFetch from "../../hooks/useFetch";

const MainPage = () => {
  const navigate = useNavigate(); //저축통 버튼 관련

  const handleCreateSavings = () => {
    // TODO: '새 저축통 만들기' 페이지로 이동하는 로직을 여기에 추가합니다.
    navigate('/buckets/fixed');
  };

  // 메인 진입 시 알림 목록을 조회하여 읽지 않은 알림 존재 여부를 계산
  const { data } = useFetch<NotificationsResponse>(() => fetchNotifications(1, 500), []);
  const hasNotification = (data?.counts.unread ?? 0) > 0;

  return (
    <S.Container>
      <S.Header>
        <S.Title>적금통 키우기</S.Title>
        <NotificationIcon hasNotification={hasNotification} />
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
