import React from 'react';
import * as S from './NotificationItem.styles'

interface NotificationItemProps {
  type: string;
  title: string;
  content: string;
  date: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ type, title, content, date }) => {
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        <S.Type>{type}</S.Type>
      </S.TitleWrapper>
      <S.Content>{content}</S.Content>
      <S.Date>{date}</S.Date>
    </S.Container>
  );
};

export default NotificationItem;