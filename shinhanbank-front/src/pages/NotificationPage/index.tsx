import TabComponent from '../../components/Tab/TabComponent';
import NotificationItem from './components/NotificationItem/NotificationItem';
import { notificationData } from '../../api/mockData';
import * as S from './NotificationPage.styles'

const NotificationPage = () => {
  const allNotifications = notificationData.all.map(item => (
    <NotificationItem key={item.id} {...item} />
  ));
  const eventNotifications = notificationData.event.map(item => (
    <NotificationItem key={item.id} {...item} />
  ));

  const tabs = [
    { name: `전체 (${notificationData.all.length})`, component: <S.NotificationList>{allNotifications}</S.NotificationList> },
    { name: `이벤트 (${notificationData.event.length})`, component: <S.NotificationList>{eventNotifications}</S.NotificationList> },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>알림</S.Title>
      </S.Header>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default NotificationPage;