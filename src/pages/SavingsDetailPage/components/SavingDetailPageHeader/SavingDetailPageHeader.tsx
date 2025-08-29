import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate 훅 import
import * as S from "./SavingDetailPageHeader.styles";
import menu from "../../../../assets/icons/menu-dots.svg";
import BackButton from "../../../../components/BackButton/BackButton";

interface DetailPageHeaderProps {
  title: string;
  showMenu: boolean;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({ title, showMenu }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams<{ id: string }>();

  const handleMenuClick = () => {
    if (id) {
      navigate(`/save-settings/${id}`); // 가져온 id를 사용하여 동적 경로로 이동
    }
  };

  return (
    <S.Container>
      <BackButton />
      <S.Title>{title}</S.Title>{" "}
      {showMenu && (
        <S.MenuButton onClick={handleMenuClick}>
          <S.MenuIcon src={menu} alt="메뉴" />{" "}
        </S.MenuButton>
      )}{" "}
    </S.Container>
  );
};

export default DetailPageHeader;
