export default function IdleBear() {
  return (
    <div
      style={{
        display: "inline-block",
        animation: "idleFloat 3s ease-in-out infinite",
        transformBox: "fill-box" as any, // SVG 좌표 기준
      }}
    >
      <svg viewBox="0 0 200 200" width={200} height={200}>
        {/* 단순 얼굴 원 */}
        <circle cx="100" cy="100" r="80" fill="#fff" stroke="#000" strokeWidth="3" />
        {/* 눈 */}
        <circle cx="80" cy="90" r="6" fill="#000" />
        <circle cx="120" cy="90" r="6" fill="#000" />
        {/* 코 */}
        <ellipse cx="100" cy="105" rx="8" ry="6" fill="#000" />
        {/* 입 */}
        <path d="M90 112 q10 8 20 0" stroke="#000" strokeWidth="3" fill="none" />
      </svg>

      {/* keyframes 정의 */}
      <style>
        {`
          @keyframes idleFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
}
