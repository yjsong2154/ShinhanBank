import React from "react";
import * as S from "./FeedItem.styles";
import Character from "../../../../components/Character/Character";

interface FeedItemProps {
  author: string;
  title: string;
  content: string;
  period: string;
  target: number;
  current: number;
  likes: number;
  comments: number;
  characterId: number;
}

const FeedItem: React.FC<FeedItemProps> = ({
  author,
  title,
  content,
  period,
  target,
  current,
  likes,
  comments,
  characterId,
}) => {
  const progressPercentage =
    target > 0 ? Math.round((current / target) * 100) : 0;

  return (
    <S.Container>
      <S.LeftSection>
        <S.ProgressCircle progress={progressPercentage}>
          <S.CharacterWrapper>
            <Character id={characterId} />
          </S.CharacterWrapper>
        </S.ProgressCircle>
        <S.GoalText>
          <span>
            목표: ₩{target.toLocaleString()} ({progressPercentage}%)
          </span>
        </S.GoalText>
      </S.LeftSection>
      <S.RightSection>
        <S.AuthorInfo>
          <S.Author>{author}</S.Author>
          <S.Period>{period}</S.Period>
        </S.AuthorInfo>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>

        <S.ReactionInfo>
          <S.ReactionItem>
            <img src="icons/like_icon_empty.svg" alt="like icon" />
            <S.ReactionCount>{likes}</S.ReactionCount>
          </S.ReactionItem>
          <S.ReactionItem>
            <img src="icons/comment_icon.svg" alt="comment icon" />
            <S.ReactionCount>{comments}</S.ReactionCount>
          </S.ReactionItem>
        </S.ReactionInfo>
      </S.RightSection>
    </S.Container>
  );
};

export default FeedItem;
