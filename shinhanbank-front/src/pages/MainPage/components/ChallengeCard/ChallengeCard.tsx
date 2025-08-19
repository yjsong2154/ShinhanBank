import * as S from "./ChallengeCard.styles";
import dartIcon from "../../../../assets/dart.png"; // dart 아이콘
// import challengeImage from '../../assets/images/challenge-image.png';

const ChallengeCard = () => {
  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon src={dartIcon} alt="dart icon" />
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
            <S.Button>참여하기</S.Button>
          </S.MetaRow>
        </S.TextWrapper>
        {/* <S.Image src={challengeImage} alt="챌린지 이미지" /> */}
      </S.CardWrapper>
    </S.Container>
  );
};

export default ChallengeCard;
