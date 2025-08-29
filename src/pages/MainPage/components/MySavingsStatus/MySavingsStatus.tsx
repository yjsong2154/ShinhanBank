import * as S from "./MySavingsStatus.styles";
import Character from "../../../../components/Character/Character";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useSavings from "../../../../hooks/useSavings";

const MySavingsStatus = () => {
  const { data: savings, loading, error } = useSavings();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.Container>
      <S.Title>
        <S.TitleIcon>
          <img src="/icons/pig.svg" alt="pig icon" />
        </S.TitleIcon>
        나의 적금통 현황
      </S.Title>
      <S.ListWrapper>
        {savings && savings.length > 0 ? (
          <S.ScrollRow>
            {savings.map((item) => (
              <S.CardLink to={`/savings/${item.id}`} key={item.id}>
                <S.Card>
                  <S.CharacterBubble>
                    <Character id={item.character.character_item.id} />
                  </S.CharacterBubble>

                  <S.CardBody>
                    <S.CardTitle>{item.name}</S.CardTitle>
                    <S.CardDesc>{item.description}</S.CardDesc>

                    <S.Progress>
                      <S.ProgressBar
                        style={{ width: `${item.current_progress}%` }}
                      />
                      <S.ProgressText>{item.current_progress}%</S.ProgressText>
                    </S.Progress>

                    <S.MetaRow>
                      <S.MetaItem type="button" aria-label="좋아요">
                        <S.MetaIcon
                          src="/icons/like_icon_empty.svg"
                          alt="좋아요"
                          aria-hidden="true"
                        />
                        <span>{item.like_count}</span>
                      </S.MetaItem>

                      <S.MetaItem type="button" aria-label="댓글">
                        <S.MetaIcon
                          src="icons/comment_icon.svg"
                          alt="댓글"
                          aria-hidden="true"
                        />
                        <span>{item.comment_count}</span>
                      </S.MetaItem>
                    </S.MetaRow>
                  </S.CardBody>
                </S.Card>
              </S.CardLink>
            ))}
          </S.ScrollRow>
        ) : (
          <S.EmptyMessage>진행중인 적금이 없습니다.</S.EmptyMessage>
        )}
      </S.ListWrapper>
    </S.Container>
  );
};

export default MySavingsStatus;
