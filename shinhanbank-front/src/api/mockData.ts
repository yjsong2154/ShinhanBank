// 메인 페이지 랭킹 데이터
export const rankingData = {
  friends: [
    { rank: 1, name: '김철수', amount: 456000, profileUrl: '/images/profile1.png', crown: true },
    { rank: 2, name: '이영희', amount: 423000, profileUrl: '/images/profile2.png', crown: false },
    { rank: 3, name: '박민수', amount: 398000, profileUrl: '/images/profile3.png', crown: false },
  ],
  university: [
    { rank: 1, name: '연세대학교', amount: 89000000, crown: true },
    { rank: 2, name: '고려대학교', amount: 87000000, crown: false },
    { rank: 3, name: '서강대학교', amount: 85000000, crown: false },
  ],
  interUniversity: [
    { rank: 1, name: '카이스트', amount: 95000000, crown: true },
    { rank: 2, name: '포항공과대학교', amount: 93000000, crown: false },
    { rank: 3, name: '서울대학교', amount: 91000000, crown: false },
  ],
};

//메인 페이지 글 데이터
export const feedData = {
  latest: [
    {
      id: 1,
      author: '수지',
      title: '여행 자금 모으기',
      content: '졸업 여행을 위해 매일 성실히 잔액 확인하고 있어요!',
      period: '2시간 전',
      target: 2000000,
      current: 1340000,
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: '익병',
      title: '노트북 구매 자금',
      content: '개발 공부용 맥북 사려고 아르바이트비 모으는 중!',
      period: '2시간 전',
      target: 2000000,
      current: 460000,
      likes: 18,
      comments: 12,
    },
  ],
  popular: [
    {
      id: 3,
      author: '지훈',
      title: '첫 차 구매',
      content: '꾸준히 모아서 드디어 목표 금액 달성!',
      period: '1일 전',
      target: 30000000,
      current: 30000000,
      likes: 55,
      comments: 21,
    },
  ],
  liked: [
    {
      id: 4,
      author: '민지',
      title: '해외여행 적금',
      content: '해외여행 가려고 열심히 적금 넣는 중!',
      period: '4시간 전',
      target: 1500000,
      current: 1000000,
      likes: 42,
      comments: 15,
    },
  ],
};