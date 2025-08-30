import * as S from "./LoadingSpinner.styles";

const LoadingSpinner = () => {
  return (
    <S.SpinnerWrapper>
      <S.DotTrack>
        {[0, 1, 2, 3, 4].map((i) => (
          <S.Dot key={i} index={i} />
        ))}
      </S.DotTrack>
      <S.LoadingText>데이터를 불러오는 중...</S.LoadingText>
    </S.SpinnerWrapper>
  );
};

export default LoadingSpinner;
