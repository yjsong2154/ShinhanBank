import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./SavingDetailPageHeader.styles";
import menu from "../../../../assets/icons/menu-dots.svg";
import BackButton from "../../../../components/BackButton/BackButton";
import { toggleLike } from "../../../../api/toggleLike";

interface DetailPageHeaderProps {
  title: string;
  showMenu: boolean;
  initialIsLiked: boolean;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({ title, showMenu, initialIsLiked }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleMenuClick = () => {
    if (id) {
      navigate(`/save-settings/${id}`);
    }
  };

  const handleLikeClick = async () => {
    if (!id) return;
    setIsAnimating(true);
    try {
      const response = await toggleLike(id);
      setIsLiked(response.is_liked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setTimeout(() => setIsAnimating(false), 500); // Animation duration
    }
  };

  const heartIcon = isLiked ? "/icons/like_icon_fill.svg" : "/icons/like_icon_empty.svg";

  return (
    <S.Container>
      <BackButton />
      <S.Title>{title}</S.Title>
      {showMenu ? (
        <S.MenuButton onClick={handleMenuClick}>
          <S.MenuIcon src={menu} alt="메뉴" />
        </S.MenuButton>
      ) : (
        <S.LikeButton onClick={handleLikeClick} className={isAnimating ? 'animating' : ''}>
          <S.HeartIcon src={heartIcon} alt="좋아요" />
        </S.LikeButton>
      )}
    </S.Container>
  );
};

export default DetailPageHeader;
