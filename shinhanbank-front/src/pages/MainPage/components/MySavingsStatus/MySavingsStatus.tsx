import * as S from './MySavingsStatus.styles';

const MySavingsStatus = () => {
  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon>🟣</S.TitleIcon>
        나의 저축 현황
      </S.Title>
      <S.StatusWrapper>
        <S.Count>
          <S.CountNumber>5개</S.CountNumber>
          <S.CountText>저축통 개수</S.CountText>
        </S.Count>
        <S.Amount>
          <S.AmountNumber>₩234,500</S.AmountNumber>
          <S.AmountText>총 저축 금액</S.AmountText>
        </S.Amount>
      </S.StatusWrapper>
      <S.Alert>
        <S.AlertIcon>⚠️</S.AlertIcon>
        오늘 채우지 않은 저축통이 2개 있어요!
      </S.Alert>
    </S.Container>
  );
};

export default MySavingsStatus;