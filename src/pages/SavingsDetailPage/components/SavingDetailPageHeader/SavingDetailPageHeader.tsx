import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SavingDetailPageHeader.styles';
import arrowLeftIcon from '../../../../../public/icons/arrow-left.svg'; // 아이콘 경로
import menu from '../../../../../public/icons/menu-dots.svg';

interface DetailPageHeaderProps {
  title: string;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <S.Container>
      <S.BackButton onClick={handleGoBack}>
        <S.Icon src={arrowLeftIcon} alt="뒤로가기" />
      </S.BackButton>
      <S.Title>{title}</S.Title>
      <S.MenuButton>
        <S.MenuIcon src={menu} alt="메뉴" />
      </S.MenuButton>
    </S.Container>
  );
};

export default DetailPageHeader;