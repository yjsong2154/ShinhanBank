import { useNavigate } from 'react-router-dom';
import * as S from './BackButton.styles';
import arrowLeftIcon from '../../assets/icons/back.svg';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <S.Container onClick={handleGoBack}>
      <S.Icon src={arrowLeftIcon} alt="뒤로가기" />
    </S.Container>
  );
};

export default BackButton;