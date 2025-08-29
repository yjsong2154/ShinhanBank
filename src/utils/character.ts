// src/utils/character.ts
export const CHARACTER_MAP: Record<string, string> = {
  moli: "/character/moli.png",
  pli: "/character/pli.png",
  rino: "/character/rino.png",
};

export const CLOTHES_MAP: Record<string, string> = {
  ballcap: "/clothes/ballcap.png",
  beanie: "/clothes/beanie.png",
  explorer_cap: "/clothes/explorer_cap.png",
  explorer: "/clothes/explorer.png",
  hoodie: "/clothes/hoodie.png",
  jumper: "/clothes/jumper.png",
};

export type CharacterKey = keyof typeof CHARACTER_MAP;
export type ClothesKey = keyof typeof CLOTHES_MAP;

export const getCharacterImage = (base?: string) =>
  base && CHARACTER_MAP[base] ? CHARACTER_MAP[base] : undefined;

export const getClothesImage = (key?: string) =>
  key && CLOTHES_MAP[key] ? CLOTHES_MAP[key] : undefined;

const KOR_TO_KEY: Record<string, string> = {
  // 캐릭터
  몰리: "moli",
  플리: "pli",
  리노: "rino",
  // 의상
  캡모자: "ballcap",
  "별무늬 비니": "beanie",
  "탐험가 모자": "explorer_cap",
  "탐험가 옷": "explorer",
  "하늘빛 후드티": "hoodie",
  야구점퍼: "jumper",
};

const normalize = (s?: string) => {
  if (!s) return undefined;
  const trimmed = s.trim();
  if (KOR_TO_KEY[trimmed]) return KOR_TO_KEY[trimmed];
  return trimmed
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

/** 캐릭터/의상 둘 다 탐색 */
export const getRewardImage = (nameOrCode?: string) => {
  const key = normalize(nameOrCode);
  if (!key) return undefined;
  return CLOTHES_MAP[key] ?? CHARACTER_MAP[key] ?? undefined;
};
