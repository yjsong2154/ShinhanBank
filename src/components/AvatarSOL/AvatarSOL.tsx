import { useState } from 'react';
import { PARTS_MAP, HATS_MAP, CLOTHS_MAP } from './partsLoader';
import styles from './AvatarSOL.module.css';

type Char = 1 | 2 | 3;
type Item = 1 | 2 | 3;

type State = 'idle' | 'wave';

interface Props {
  size?: number;
  character?: Char;      // ✅ 0 제거
  cloth?: 0 | Item;      // 0 허용(없음)
  hat?: 0 | Item;        // 0 허용(없음)
}

const ROOT = 200;
const px = (v: number) => v * ROOT;

const LAYOUT = {
  head: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  eyes: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  mouth: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  body: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  lArm: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  rArm: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  lLeg: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  rLeg: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
  chick: { x: 0, y: 0.1, w: 0.9, h: 0.90 },
} as const;

export default function AvatarSOL({ size = 240, character = 1, cloth = 0, hat = 0 }: Props) {
  const [randomState] = useState<State>(() => (Math.random() < 0.5 ? 'idle' : 'wave'));

  const { Head, Eye, Mouth, Body, LArm, RArm, LLeg, RLeg, Chick } = PARTS_MAP[character];
  const CurrentHead = hat !== 0 ? HATS_MAP[character][hat] : Head;
  const CurrentBody = cloth !== 0 ? CLOTHS_MAP[character][cloth].Body : Body;
  const CurrentLArm = cloth !== 0 ? CLOTHS_MAP[character][cloth].LArm : LArm;
  const CurrentRArm = cloth !== 0 ? CLOTHS_MAP[character][cloth].RArm : RArm;

  return (
    <div className={[styles.avatar, randomState === 'idle' ? styles.idle : styles.wave].join(' ')}>
      {/* 부모 viewBox는 고정(200x200). size만 바꾸면 전체 스케일 자동 반영 */}
      <svg viewBox={`0 0 ${ROOT} ${ROOT}`} width={size} height={size} role="img" aria-label="SOL avatar">
        {/* 바닥 그림자 */}
        <ellipse cx={px(0.50)} cy={px(0.86)} rx={px(0.16)} ry={px(0.04)} fill="#000" opacity="0.08" />
        <g id="armR" transform={`translate(${px(LAYOUT.rArm.x)},${px(LAYOUT.rArm.y)})`}>
          <g
            id="armR-inner"
            className={randomState === 'wave' ? styles.waveArm : undefined}
          >
            <g
            className={randomState === 'idle' ? styles.waveArmIdleL : undefined}
            >
            <CurrentRArm width={px(LAYOUT.rArm.w)} height={px(LAYOUT.rArm.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
          </g>
        </g>

        {/* 다리 */}
        <g id="legs">
          {/* 👇 이 부분에 id="legL" 추가 */}
          <g id="legL" transform={`translate(${px(LAYOUT.lLeg.x)},${px(LAYOUT.lLeg.y)})`}>
            <g
            className={randomState === 'idle' ? styles.waveArmIdleR : undefined}
            >
            <LLeg width={px(LAYOUT.lLeg.w)} height={px(LAYOUT.lLeg.h)} preserveAspectRatio="xMidYMid meet" />
          </g>
          </g>
          {/* 👇 이 부분에 id="legR" 추가 */}
          <g id="legR" transform={`translate(${px(LAYOUT.rLeg.x)},${px(LAYOUT.rLeg.y)})`}>
            <g
            className={randomState === 'idle' ? styles.waveArmIdleL : undefined}
            >
            <RLeg width={px(LAYOUT.rLeg.w)} height={px(LAYOUT.rLeg.h)} preserveAspectRatio="xMidYMid meet" />
            </g>
          </g>
        </g>

        {/* 몸통 */}
        <g id="body" transform={`translate(${px(LAYOUT.body.x)},${px(LAYOUT.body.y)})`}>
          <CurrentBody width={px(LAYOUT.body.w)} height={px(LAYOUT.body.h)} preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* 머리 */}
        <g
            className={styles.waveHead}
          >
        <g id="head" transform={`translate(${px(LAYOUT.head.x)},${px(LAYOUT.head.y)})`}>
          
          <CurrentHead width={px(LAYOUT.head.w)} height={px(LAYOUT.head.h)} preserveAspectRatio="xMidYMid meet" />
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

        <g id="chick" transform={`translate(${px(LAYOUT.chick.x)},${px(LAYOUT.chick.y)})`}>
          <Chick width={px(LAYOUT.chick.w)} height={px(LAYOUT.chick.h)} preserveAspectRatio="xMidYMid meet" />
        </g>
        </g>

        {/* 팔 (오른팔은 인사용 회전 그룹 분리) */}
        <g id="armL" transform={`translate(${px(LAYOUT.lArm.x)},${px(LAYOUT.lArm.y)})`}>
          <g
            className={randomState === 'idle' ? styles.waveArmIdleR : undefined}
            >
          <CurrentLArm width={px(LAYOUT.lArm.w)} height={px(LAYOUT.lArm.h)} preserveAspectRatio="xMidYMid meet" />
        </g>
        </g>
      </svg>
    </div>
  );
}
