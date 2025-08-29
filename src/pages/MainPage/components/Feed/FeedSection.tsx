import React from 'react';
import { Link } from 'react-router-dom';
import TabComponent from '../../../../components/Tab/TabComponent';
import FeedItem from './FeedItem';
import * as S from './FeedSection.styles';
import useFeed from '../../../../hooks/useFeed';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

// 각 탭에 대한 컨텐츠를 별도의 컴포넌트로 분리
const FeedContent: React.FC<{ category: string }> = ({ category }) => {
  const { data: feedData, loading, error } = useFeed(category);

  if (loading) return <LoadingSpinner />;
  if (error) return <S.EmptyMessage>피드를 불러오는 중 오류가 발생했습니다.</S.EmptyMessage>;

  if (!feedData || feedData.length === 0) {
    const message = category === 'my_liked' 
      ? '아직 좋아요를 누른 글이 없습니다.' 
      : '추천 글이 없습니다.';
    return <S.EmptyMessage>{message}</S.EmptyMessage>;
  }

  return (
    <S.FeedList>
      {feedData.map(item => (
        <Link to={`/savings/${item.id}`} key={item.id}>
          <FeedItem {...item} />
        </Link>
      ))}
    </S.FeedList>
  );
};

const FeedSection = () => {
  const tabs = [
    { name: '최신 글', component: <FeedContent category="recently" /> },
    { name: '인기 글', component: <FeedContent category="like" /> },
    { name: '좋아요', component: <FeedContent category="my_liked" /> },
  ];

  return (
    <S.Container>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default FeedSection;