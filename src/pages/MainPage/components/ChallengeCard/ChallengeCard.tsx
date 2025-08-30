import { useNavigate } from "react-router-dom";
import * as S from "./ChallengeCard.styles";

const ChallengeCard = () => {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // 이미지가 로드되지 않았을 때 콘솔에 에러 메시지를 출력합니다.
    console.error("Image loading failed:", e.currentTarget.src);
    // 대체 이미지를 표시하거나 특정 동작을 추가할 수 있습니다.
    // e.currentTarget.src = "/path/to/placeholder.png";
  };

  const handleParticipate = () => {
    navigate("/buckets/flexible");
  };

  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon src="/dart.png" alt="dart icon" onError={handleImageError} />
        이번 주 챌린지
      </S.Title>
      <S.CardWrapper>
        <S.TextWrapper>
          <S.ChallengeTitle>대학생 커피 절약 챌린지</S.ChallengeTitle>
          <S.ChallengeDescription>
            일주일 동안 커피 대신 텀블러를 들고 다니며 절약한 금액은 저축해
            보세요!
          </S.ChallengeDescription>
          <S.MetaRow>
            <S.ChallengeInfo>
              <span>참여자 1,234명</span>
              <span>D-3</span>
            </S.ChallengeInfo>
            <S.Button onClick={handleParticipate}>참여하기</S.Button>
          </S.MetaRow>
        </S.TextWrapper>
        {/* <S.Image src={challengeImage} alt="챌린지 이미지" /> */}
      </S.CardWrapper>
    </S.Container>
  );
};

export default ChallengeCard;
