import TabComponent from '../../../../components/Tab/TabComponent';
import FeedItem from './FeedItem';
import { feedData } from '../../../../api/mockData';
import * as S from './FeedSection.styles';

const FeedSection = () => {
  const latestFeedList = feedData.latest.map(item => (
    <FeedItem key={item.id} {...item} />
  ));

  const popularFeedList = feedData.popular.map(item => (
    <FeedItem key={item.id} {...item} />
  ));

  const likedFeedList = feedData.liked.map(item => (
    <FeedItem key={item.id} {...item} />
  ));

  const tabs = [
    { name: '최신 글', component: <S.FeedList>{latestFeedList}</S.FeedList> },
    { name: '인기 글', component: <S.FeedList>{popularFeedList}</S.FeedList> },
    { name: '좋아요', component: <S.FeedList>{likedFeedList}</S.FeedList> },
  ];

  return (
    <S.Container>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default FeedSection;