import React from 'react';
import * as S from './FeedItem.styles';
// import heartIcon from '../../assets/icons/heart.svg';
// import commentIcon from '../../assets/icons/comment.svg';

interface FeedItemProps {
  author: string;
  title: string;
  content: string;
  period: string;
  target: number;
  current: number;
  likes: number;
  comments: number;
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
}) => {
  const progressPercentage = Math.round((current / target) * 100);

  return (
    <S.Container>
      <S.AuthorInfo>
        <S.Author>{author}</S.Author>
        <S.Period>{period}</S.Period>
      </S.AuthorInfo>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
      <S.ProgressInfo>
        <span>목표: ₩{target.toLocaleString()} ({progressPercentage}%)</span>
      </S.ProgressInfo>
      <S.ReactionInfo>
        <S.ReactionItem>
          {/* <S.ReactionIcon src={heartIcon} alt="좋아요" /> */}
          <S.ReactionCount>{likes}</S.ReactionCount>
        </S.ReactionItem>
        <S.ReactionItem>
          {/* <S.ReactionIcon src={commentIcon} alt="댓글" /> */}
          <S.ReactionCount>{comments}</S.ReactionCount>
        </S.ReactionItem>
      </S.ReactionInfo>
    </S.Container>
  );
};

export default FeedItem;