// src/components/AvatarSOL/AvatarSOL.tsx
import styles from './AvatarSOL.module.css';

// 파츠 SVG (SVGR)
import Head from './parts/head.svg?react';
import Eye from './parts/eye.svg?react';
import Mouth from './parts/mouth.svg?react';
import Body from './parts/body.svg?react';
import LArm from './parts/l_arm.svg?react';
import RArm from './parts/r_arm.svg?react';
import LLeg from './parts/l_leg.svg?react';
import RLeg from './parts/r_leg.svg?react';
import Chick from './parts/chick.svg?react';

type State = 'idle' | 'wave';

interface Props {
  size?: number;      // 출력 픽셀 (예: 240)
  state?: State;      // idle / wave
}

/** 부모 SVG의 고정 좌표계(논리 단위) */
const ROOT = 200;

/** 0~1 비율을 ROOT 픽셀로 환산 */
const px = (v: number) => v * ROOT;

/** 각 파츠의 배치(비율 기준, 단위: 0~1)
 *  x,y: 좌.1 기준 위치
 *  w,h: 파츠 박스 크기 (뷰박스 비율 유지됨)
 *  값은 대략값이니 프로젝트 이미지에 맞게 미세조정만 하시면 됩니다.
 */
const LAYOUT = {
  head: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },
  eyes: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },
  mouth: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },

  body: { x: 0.44, y: 0.6, w: 0.237, h: 0.237 },

  lArm: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },
  rArm: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },

  lLeg: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },
  rLeg: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },

  chick: { x: 0.1, y: 0.1, w: 0.9, h: 0.90 },
} as const;

export default function AvatarSOL({ size = 240, state = 'idle' }: Props) {
  return (
    <div className={[styles.avatar, state === 'idle' ? styles.idle : styles.wave].join(' ')}>
      {/* 부모 viewBox는 고정(200x200). size만 바꾸면 전체 스케일 자동 반영 */}
      <svg viewBox={`0 0 ${ROOT} ${ROOT}`} width={size} height={size} role="img" aria-label="SOL avatar">
        {/* 바닥 그림자 */}
        <ellipse cx={px(0.50)} cy={px(0.86)} rx={px(0.16)} ry={px(0.04)} fill="#000" opacity="0.08" />

        {/* 다리 */}
        <g id="legs">
          {/* 👇 이 부분에 id="legL" 추가 */}
          <g id="legL" transform={`translate(${px(LAYOUT.lLeg.x)},${px(LAYOUT.lLeg.y)})`}>
            <g
            className={state === 'idle' ? styles.waveArmIdle : undefined}
            >
            <LLeg width={px(LAYOUT.lLeg.w)} height={px(LAYOUT.lLeg.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
          </g>
          {/* 👇 이 부분에 id="legR" 추가 */}
          <g id="legR" transform={`translate(${px(LAYOUT.rLeg.x)},${px(LAYOUT.rLeg.y)})`}>
            <RLeg width={px(LAYOUT.rLeg.w)} height={px(LAYOUT.rLeg.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
        </g>

        {/* 몸통 */}
        <g id="body" transform={`translate(${px(LAYOUT.body.x)},${px(LAYOUT.body.y)})`}>
          <Body width={px(LAYOUT.body.w)} height={px(LAYOUT.body.h)} preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* 머리 */}
        <g id="head" transform={`translate(${px(LAYOUT.head.x)},${px(LAYOUT.head.y)})`}>
          <Head width={px(LAYOUT.head.w)} height={px(LAYOUT.head.h)} preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* 얼굴 */}
        <g id="face">
          <g id="eyes" transform={`translate(${px(LAYOUT.eyes.x)},${px(LAYOUT.eyes.y)})`}>
            <Eye width={px(LAYOUT.eyes.w)} height={px(LAYOUT.eyes.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
          <g id="mouth" transform={`translate(${px(LAYOUT.mouth.x)},${px(LAYOUT.mouth.y)})`}>
            <Mouth width={px(LAYOUT.mouth.w)} height={px(LAYOUT.mouth.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
        </g>

        {/* 팔 (오른팔은 인사용 회전 그룹 분리) */}
        <g id="armL" transform={`translate(${px(LAYOUT.lArm.x)},${px(LAYOUT.lArm.y)})`}>
          <LArm width={px(LAYOUT.lArm.w)} height={px(LAYOUT.lArm.h)} preserveAspectRatio="xMidYMid meet" />
        </g>
        <g id="armR" transform={`translate(${px(LAYOUT.rArm.x)},${px(LAYOUT.rArm.y)})`}>
          <g
            id="armR-inner"
            className={state === 'wave' ? styles.waveArm : undefined}
          >
            <RArm width={px(LAYOUT.rArm.w)} height={px(LAYOUT.rArm.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
        </g>

        {/* 소품 */}
        <g id="chick" transform={`translate(${px(LAYOUT.chick.x)},${px(LAYOUT.chick.y)})`}>
          <Chick width={px(LAYOUT.chick.w)} height={px(LAYOUT.chick.h)} preserveAspectRatio="xMidYMid meet" />
        </g>
      </svg>
    </div>
  );
}
