// 메인 페이지 랭킹 데이터
export const rankingData = {
  friends: [
    {
      rank: 1,
      name: "김철수",
      amount: 456000,
      profileUrl: "/images/profile1.png",
      crown: true,
    },
    {
      rank: 2,
      name: "이영희",
      amount: 423000,
      profileUrl: "/images/profile2.png",
      crown: false,
    },
    {
      rank: 3,
      name: "박민수",
      amount: 398000,
      profileUrl: "/images/profile3.png",
      crown: false,
    },
    {
      rank: 4,
      name: "최수진",
      amount: 372000,
      profileUrl: "/images/profile4.png",
    },
    {
      rank: 5,
      name: "한지선",
      amount: 351000,
      profileUrl: "/images/profile5.png",
    },
    {
      rank: 6,
      name: "정우현",
      amount: 329000,
      profileUrl: "/images/profile6.png",
    },
  ],
  university: [
    { rank: 1, name: "연세대학교", amount: 89000000, crown: true },
    { rank: 2, name: "고려대학교", amount: 87000000, crown: false },
    { rank: 3, name: "서강대학교", amount: 85000000, crown: false },
    { rank: 4, name: "한양대학교", amount: 82000000, crown: false },
    { rank: 5, name: "중앙대학교", amount: 79000000, crown: false },
    { rank: 6, name: "경희대학교", amount: 76000000, crown: false },
  ],
  interUniversity: [
    { rank: 1, name: "카이스트", amount: 95000000, crown: true },
    { rank: 2, name: "포항공과대학교", amount: 93000000, crown: false },
    { rank: 3, name: "서울대학교", amount: 91000000, crown: false },
    { rank: 4, name: "성균관대학교", amount: 89000000, crown: false },
    { rank: 5, name: "동국대학교", amount: 86000000, crown: false },
    { rank: 6, name: "이화여자대학교", amount: 83000000, crown: false },
  ],
};

//메인 페이지 글 데이터
export const feedData = {
  latest: [
    {
      id: 1,
      author: "수지",
      title: "여행 자금 모으기",
      content: "졸업 여행을 위해 매일 성실히 잔액 확인하고 있어요!",
      period: "2시간 전",
      target: 2000000,
      current: 1340000,
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: "익병",
      title: "노트북 구매 자금",
      content: "개발 공부용 맥북 사려고 아르바이트비 모으는 중!",
      period: "2시간 전",
      target: 2000000,
      current: 460000,
      likes: 18,
      comments: 12,
    },
  ],
  popular: [
    {
      id: 3,
      author: "지훈",
      title: "첫 차 구매",
      content: "꾸준히 모아서 드디어 목표 금액 달성!",
      period: "1일 전",
      target: 30000000,
      current: 30000000,
      likes: 55,
      comments: 21,
    },
  ],
  liked: [
    {
      id: 4,
      author: "민지",
      title: "해외여행 적금",
      content: "해외여행 가려고 열심히 적금 넣는 중!",
      period: "4시간 전",
      target: 1500000,
      current: 1000000,
      likes: 42,
      comments: 15,
    },
  ],
};

// 마이 페이지 프로필용 데이터
export const myProfile = {
  name: "김서연",
  studentId: "학번: 2021****",
  university: "연세대학교",
  linkedAccount: "신한 ****-****-1234",
  profileImageUrl: "/images/profile_kim.png",
};

// 마이페이지 챌린지 관련 데이터
// src/api/mockData.ts
// 다른 데이터 아래에 추가
export const myPageData = {
  profile: {
    name: "김서연",
    studentId: "2021****",
    university: "연세대학교",
    linkedAccount: "신한 ****-****-1234",
    profileImageUrl: "/images/profile_kim.png",
  },
  character: {
    name: "새싹이",
    level: 3,
    points: 2450,
    nextLevelPoints: 850,
  },
  savingsList: [
    {
      id: 1,
      title: "여행 자금 모으기",
      currentAmount: 450000,
      targetAmount: 1000000,
      period: "155일 남음",
      progress: 45,
      status: "진행중",
    },
    {
      id: 2,
      title: "노트북 구매 자금",
      currentAmount: 800000,
      targetAmount: 800000,
      period: "완료",
      progress: 100,
      status: "완료",
    },
  ],
  challengeHistory: {
    inProgress: [
      {
        id: 1,
        title: "30일 매일 저축",
        progress: 50,
        period: "15일 남음",
        reward: "15원",
      },
      {
        id: 2,
        title: "주말 용돈 아끼기",
        progress: 85,
        period: "3일 남음",
        reward: "3원",
      },
    ],
    completed: [
      {
        id: 3,
        title: "커피 절약 챌린지",
        progress: 100,
        period: "완료",
        reward: "1,500원",
      },
    ],
  },
};

// 알림 페이지
export const notificationData = {
  all: [
    {
      id: 1,
      type: "광고",
      title: "설하수 무조건 90% 할인쿠폰!🤑",
      content:
        "[광고] 설 선물은? 설하수가 정한 명품으로 하니 안심하고 구매하세요 😊",
      date: "9시간 전",
    },
    {
      id: 2,
      type: "광고",
      title: "무료쿠폰!❤️",
      content:
        "[광고] 원로그가 드리는 월세 할인 쿠폰! 80% 할인! 지금 바로 받아가세요",
      date: "2시간 전",
    },
    {
      id: 3,
      type: "광고",
      title: "최근에 산 폰에 계정 연동됐어요❤️",
      content:
        "[광고] 최근 접속한 한정판 에어팟 프로 13,000₩ 쿠폰 받고 바로 GO!",
      date: "어제 10:00",
    },
    {
      id: 4,
      type: "광고",
      title: "오늘만! ❤️",
      content:
        "[광고] 랭킹 보상 쿠폰! 랭킹1등하면 모든 혜택을 1년 동안 누릴 수 있습니다! 당첨자는?",
      date: "어제 14:00",
    },
  ],
  event: [
    {
      id: 5,
      type: "이벤트",
      title: "친구 초대하고 1000P 받으세요!",
      content: "친구와 함께 적금 챌린지를 시작하고 포인트를 받으세요!",
      date: "1일 전",
    },
  ],
};

//챌린지 페이지
// 기존 데이터에 이어서 추가
export const challengePageData = {
  inProgress: [
    {
      id: 1,
      title: "30일 매일 저축",
      description: "한 달 동안 매일 저축하는 습관을 길러봐요!",
      participants: 589,
      period: "D-15",
      reward: "500P",
      imageUrl: "/images/challenge-30days.png",
      status: "진행중",
    },
    {
      id: 2,
      title: "일주일 커피 절약 챌린지",
      description: "일주일간 커피 대신 텀블러 사용하고 절약한 금액 저축하기",
      participants: 1234,
      period: "D-3",
      reward: "1,500P",
      imageUrl: "/images/challenge-coffee.png",
      status: "진행중",
    },
  ],
  completed: [
    {
      id: 3,
      title: "교통비 절약 챌린지",
      description: "대중교통 대신 자전거 타고 교통비 아끼기",
      participants: 872,
      period: "완료",
      reward: "1,000P",
      imageUrl: "/images/challenge-bike.png",
      status: "완료",
    },
    {
      id: 4,
      title: "간식 끊기 챌린지",
      description: "간식 대신 과일 먹으며 건강과 돈을 모두 잡아요!",
      participants: 1540,
      period: "완료",
      reward: "800P",
      imageUrl: "/images/challenge-snack.png",
      status: "완료",
    },
  ],
};

export const selectableCharacters = [
  {
    id: "char1",
    name: "새싹이",
    imageUrl: "/images/character-plant.png",
  },
  {
    id: "char2",
    name: "곰돌이",
    imageUrl: "/images/character-bear.png",
  },
  {
    id: "char3",
    name: "토끼",
    imageUrl: "/images/character-rabbit.png",
  },
  {
    id: "char4",
    name: "병아리",
    imageUrl: "/images/character-chick.png",
  },
  {
    id: "char5",
    name: "고양이",
    imageUrl: "/images/character-cat.png",
  },
  {
    id: "char6",
    name: "강아지",
    imageUrl: "/images/character-dog.png",
  },
];
