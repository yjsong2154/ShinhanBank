import { useEffect, useMemo, useState } from 'react';
import NotificationItem from './components/NotificationItem/NotificationItem';
import * as S from './NotificationPage.styles'
import BackButton from '../../components/BackButton/BackButton';
import { deleteNotification, fetchNotifications, readAllNotifications } from '../../api/notifications';
import type { NotificationDto } from '../../api/notifications';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // 페이지 진입 시 전체 읽음 처리 후 최신 알림 목록 조회
        try {
          await readAllNotifications();
        } catch {}
        const res = await fetchNotifications(1, 500);
        setNotifications(res.notifications);
      } catch (e) {
        setError('알림을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      // noop: 실패 시 유지
    }
  };

  const formattedItems = useMemo(() => {
    return notifications.map((n) => {
      const createdAt = new Date(n.created_at).toLocaleString();
      return (
        <NotificationItem
          key={n.id}
          id={n.id}
          type={n.type}
          title={n.title}
          message={n.message}
          createdAt={createdAt}
          onDelete={handleItemDelete}
        />
      );
    });
  }, [notifications]);

  return (
    <S.Container>
      <S.Header>
        <BackButton />
        <S.Title>알림</S.Title>
      </S.Header>
      {loading && <S.NotificationList>불러오는 중...</S.NotificationList>}
      {error && <S.NotificationList>{error}</S.NotificationList>}
      {!loading && !error && (
        <S.NotificationList>
          {formattedItems}
        </S.NotificationList>
      )}
    </S.Container>
  );
};

export default NotificationPage;