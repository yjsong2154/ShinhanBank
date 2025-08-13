import { useNavigate } from 'react-router-dom';
import * as S from './Footer.styles';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <S.Container>
      <S.FooterItem onClick={() => handleNavigation('/')}>
        <S.Icon src="/icons/home.svg" alt="홈" />
        <S.Label>홈</S.Label>
      </S.FooterItem>
      <S.FooterItem onClick={() => handleNavigation('/savings')}>
        <S.Icon src="/icons/savings.svg" alt="저축통" />
        <S.Label>저축통</S.Label>
      </S.FooterItem>
      <S.FooterItem onClick={() => handleNavigation('/challenge')}>
        <S.Icon src="/icons/challenge.svg" alt="챌린지" />
        <S.Label>챌린지</S.Label>
      </S.FooterItem>
      <S.FooterItem onClick={() => handleNavigation('/mypage')}>
        <S.Icon src="/icons/mypage.svg" alt="마이" />
        <S.Label>마이</S.Label>
      </S.FooterItem>
    </S.Container>
  );
};

export default Footer;