import * as S from './LoadingSpinner.styles';

const LoadingSpinner = () => {
  return (
    <S.SpinnerWrapper>
      <S.Spinner />
      <S.LoadingText>데이터를 불러오는 중...</S.LoadingText>
    </S.SpinnerWrapper>
  );
};

export default LoadingSpinner;