import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './NotificationIcon.styles';
import bellIcon from '../../../../assets/icons/bell.svg'

interface NotificationIconProps {
  hasNotification?: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ hasNotification = false }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/notifications'); // 알림 페이지 경로로 이동
  };

  return (
    <S.Container onClick={handleIconClick}>
      <S.Icon src={bellIcon} alt="알림" />
      {hasNotification && <S.Dot />}
    </S.Container>
  );
};

export default NotificationIcon;