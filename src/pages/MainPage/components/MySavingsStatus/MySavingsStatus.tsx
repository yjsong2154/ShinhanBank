import * as S from "./MySavingsStatus.styles";
import { mockSavings } from "../../../../api/mockDataSavingsStatus";
import Character from "../../../../components/Character/Character";
import pigIcon from "../../../../assets/icons/pig.svg";
import emptylikeIcon from "../../../../assets/icons/like_icon_empty.svg";
import commentIcon from "../../../../assets/icons/comment_icon.svg";

const MySavingsStatus = () => {
  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon>
          <img src={pigIcon} alt="pig icon" />
        </S.TitleIcon>
        나의 적금통 현황
      </S.Title>
      {/* 가로 스크롤 카드 리스트 */}
      <S.ListWrapper>
        <S.ScrollRow>
          {mockSavings.map((item) => (
            <S.Card key={item.id}>
              <S.CharacterBubble>
                <Character id={item.characterId} />
              </S.CharacterBubble>

              <S.CardBody>
                <S.CardTitle>{item.title}</S.CardTitle>
                <S.CardDesc>{item.desc}</S.CardDesc>

                <S.Progress>
                  <S.ProgressBar style={{ width: `${item.progress}%` }} />
                  <S.ProgressText>{item.progress}%</S.ProgressText>
                </S.Progress>

                <S.MetaRow>
                  <S.MetaItem type="button" aria-label="좋아요">
                    <S.MetaIcon
                      src={emptylikeIcon}
                      alt="좋아요"
                      aria-hidden="true"
                    />
                    <span>{item.likes}</span>
                  </S.MetaItem>

                  <S.MetaItem type="button" aria-label="댓글">
                    <S.MetaIcon
                      src={commentIcon}
                      alt="댓글"
                      aria-hidden="true"
                    />
                    <span>{item.comments}</span>
                  </S.MetaItem>
                </S.MetaRow>
              </S.CardBody>
            </S.Card>
          ))}
        </S.ScrollRow>
      </S.ListWrapper>
    </S.Container>
  );
};

export default MySavingsStatus;
