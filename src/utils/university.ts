// src/utils/university.ts
export const UNIVERSITY_LOGOS: Record<number, string> = {
  1: "/university/hanyang.png",
  2: "/university/hongik.png",
  3: "/university/dongguk.png",
  4: "/university/ewha.png",
  5: "/university/hankuk_foreign.png",
  6: "/university/kyonggi.png",
  7: "/university/shinhan.png",
  8: "/university/soongsil.png",
};

export const getUniversityLogo = (id?: number) => {
  if (!id) return undefined;
  return UNIVERSITY_LOGOS[id];
};
