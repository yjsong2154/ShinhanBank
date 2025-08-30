// src/components/DeptOrUnivIcon.tsx
import React from "react";

type Props = {
  /** 한국어 이름. 예: "컴퓨터공학과", "한양대학교" */
  name: string;
  /** px 단위. 기본 100 */
  size?: number;
  alt?: string;
  className?: string;
};

/** 대학 이름 → 파일 슬러그 매핑 (public/university/*.png) */
const UNI_MAP: Record<string, string> = {
  "동국대학교": "dongguk",
  "이화여자대학교": "ewha",
  "한국외국어대학교": "hankuk_foreign",
  "한양대학교": "hanyang",
  "홍익대학교": "hongik",
  "경기대학교": "kyonggi",
  "신한대학교": "shinhan",
  "숭실대학교": "soongsil",
};

/** 학과/계열 → 파일 슬러그 매핑 (public/major/*.png) */
const MAJOR_RULES: Array<{ test: (s: string) => boolean; slug: string }> = [
  // 건축
  { test: s => /건축공학과|건축공학부|건축학과|건축학부/.test(s), slug: "architect" },

  // 경영
  { test: s => /경영학과|경영학부|국제경영학과|글로벌경영학과/.test(s), slug: "business" },

  // 기계
  {
    test: s =>
      /기계공학과|기계공학부|기계로봇에너지공학과|기계시스템공학과|기계시스템디자인공학과|기계자동차융합공학과/.test(
        s
      ),
    slug: "mechanical",
  },

  // 디자인
  { test: s => /디자인학부/.test(s), slug: "design" },

  // 산업
  {
    test: s =>
      /산업경영공학과|산업공학과|산업디자인학과|산업시스템공학과|산업정보시스템공학과/.test(s),
    slug: "industrial",
  },

  // 수학
  { test: s => /수학과/.test(s), slug: "math" },

  // 영어
  { test: s => /영어통번역학과/.test(s), slug: "english" },

  // 전기전자/전자
  {
    test: s =>
      /전기전자공학과|전자공학과|전자공학부|전자전기공학부|전자정보공학부/.test(s),
    slug: "electric",
  },

  // 중국어
  { test: s => /중국어과/.test(s), slug: "chinese" },

  // 컴퓨터 계열
  {
    test: s =>
      /컴퓨터공학과|컴퓨터공학부|컴퓨터소프트웨어학부|컴퓨터전자시스템공학부|컴퓨터학부|디지털정보공학과/.test(
        s
      ),
    slug: "computer",
  },

  // 화학/화공
  {
    test: s => /화공생물공학과|화학공학과|화학신소재공학과/.test(s),
    slug: "chemical",
  },

  // 일본어
  { test: s => /일본어과/.test(s), slug: "japanese" },

  // 바이오
  { test: s => /바이오융합공학과/.test(s), slug: "bio" },
];

/** public 경로 선택 */
function pickPublicPath(name: string): string {
  const n = name.trim();

  // 1) 대학 우선 매칭
  const uniSlug = UNI_MAP[n];
  if (uniSlug) return `/university/${uniSlug}.png`;

  // 2) 학과 규칙 매칭
  const key = MAJOR_RULES.find(r => r.test(n));
  if (key) return `/major/${key.slug}.png`;

  // 3) 폴백
  return `/mascot.png`;
}

const DeptOrUnivIcon: React.FC<Props> = ({ name, size = 100, alt, className }) => {
  const src = pickPublicPath(name);
  return (
    <img
      src={src}
      width={size}
      height={size}
      className={className}
      alt={alt ?? name}
      style={{ objectFit: "contain", display: "block" }}
      loading="lazy"
    />
  );
};

export default DeptOrUnivIcon;
