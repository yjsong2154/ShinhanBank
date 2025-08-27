import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
import * as S from "./SavingDetailPageHeader.styles";
import menu from "../../../../assets/icons/menu-dots.svg";
import BackButton from "../../../../components/BackButton/BackButton";

interface DetailPageHeaderProps {
  title: string;
  showMenu: boolean;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({ title, showMenu }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleMenuClick = () => {
    navigate("/save-settings"); // 적금통 설정 페이지 경로로 이동
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
