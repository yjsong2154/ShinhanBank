import Character from "../components/Character/Character";

export interface SavingItem {
  id: number;
  characterId: string;
  title: string;
  desc: string;
  progress: number;
  likes: number;
  comments: number;
}

export const mockSavings: SavingItem[] = [
  {
    id: 1,
    characterId: "0",
    title: "그래도 졸업 전에 미국은 가야지",
    desc: "이번에는 버킷리스트 꼭 이루고 싶다. 영어로 말도 많이 해보고, 그랜드 캐년도 함...",
    progress: 19,
    likes: 98,
    comments: 21,
  },
  {
    id: 2,
    characterId: "0",
    title: "아이폰 적금",
    desc: "출시 전에 선점! 이번엔 꾸준히 모으자.",
    progress: 42,
    likes: 53,
    comments: 9,
  },
  {
    id: 3,
    characterId: "0",
    title: "후쿠오카 주말 여행",
    desc: "항공권 특가 노리기 🔥",
    progress: 73,
    likes: 120,
    comments: 18,
  },
];
