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

// 마이 페이지 프로필용 데이터
export const myProfile = {
  name: '김서연',
  studentId: '학번: 2021****',
  university: '연세대학교',
  linkedAccount: '신한 ****-****-1234',
  profileImageUrl: '/images/profile_kim.png',
};

// 마이페이지 챌린지 관련 데이터
// src/api/mockData.ts
// 다른 데이터 아래에 추가
export const myPageData = {
  profile: {
    name: '김서연',
    studentId: '2021****',
    university: '연세대학교',
    linkedAccount: '신한 ****-****-1234',
    profileImageUrl: '/images/profile_kim.png',
  },
  character: {
    name: '새싹이',
    level: 3,
    points: 2450,
    nextLevelPoints: 850,
  },
  savingsList: [
    {
      id: 1,
      title: '여행 자금 모으기',
      currentAmount: 450000,
      targetAmount: 1000000,
      period: '155일 남음',
      progress: 45,
      status: '진행중',
    },
    {
      id: 2,
      title: '노트북 구매 자금',
      currentAmount: 800000,
      targetAmount: 800000,
      period: '완료',
      progress: 100,
      status: '완료',
    },
  ],
  challengeHistory: {
    inProgress: [
      {
        id: 1,
        title: '30일 매일 저축',
        progress: 50,
        period: '15일 남음',
        reward: '15원',
      },
      {
        id: 2,
        title: '주말 용돈 아끼기',
        progress: 85,
        period: '3일 남음',
        reward: '3원',
      },
    ],
    completed: [
      {
        id: 3,
        title: '커피 절약 챌린지',
        progress: 100,
        period: '완료',
        reward: '1,500원',
      },
    ],
  },
};