import { useEffect, useRef } from 'react';
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
import { dispatchAchievementUnlocked } from "../../utils/achievementEvent.ts";

const MainPage = () => {
  const navigate = useNavigate(); //저축통 버튼 관련

  const handleCreateSavings = () => {
    // TODO: '새 저축통 만들기' 페이지로 이동하는 로직을 여기에 추가합니다.
    navigate('/buckets/fixed');
  };

  // 메인 진입 시 알림 목록을 조회하여 읽지 않은 알림 존재 여부를 계산
  const { data } = useFetch<NotificationsResponse>(() => fetchNotifications(1, 500), []);
  const hasNotification = (data?.counts.unread ?? 0) > 0;

  // 같은 알림을 중복 팝업하지 않기 위한 처리된 ID 목록
  const processedIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // 읽지 않은 업적 알림을 찾아 순차 팝업 이벤트로 디스패치
    if (!data?.notifications) return;
    const unreadAchievements = data.notifications.filter((n) => n.type === 'achievement' && !n.is_read);
    unreadAchievements.forEach((n) => {
      if (processedIdsRef.current.has(n.id)) return;
      processedIdsRef.current.add(n.id);

      const title = n.related_info?.achievement_title || n.title || '';
      const message = n.message || '축하합니다! 새로운 업적을 달성했습니다!';
      // 알림 스키마에 보상명이 없으므로 빈 문자열 전달 (있으면 백엔드 202 흐름에서 채워짐)
      dispatchAchievementUnlocked({ message, title, itemName: '', raw: n, notificationId: n.id });
    });
  }, [data]);

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
