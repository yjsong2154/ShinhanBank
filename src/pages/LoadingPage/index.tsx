import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./LoadingPage.styles";

type State = { nextPath?: string; delayMs?: number };

const LoadingPage = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const nextPath = (state as State)?.nextPath ?? "/";
  const delayMs = (state as State)?.delayMs ?? 2000;

  const line1 = "신한 프렌즈와 함께 하는";
  const line2 = "적금통 키우기";

  const steps1 = useMemo(() => line1.length, [line1]);
  const steps2 = useMemo(() => line2.length, [line2]);

  // ⏱️ 타이밍 설정: 1줄 1000ms, 2줄 700ms, 2줄은 1줄 끝난 뒤 시작
  const d1 = 1000; // 첫 줄 duration
  const d2 = 700; // 둘째 줄 duration
  const gap = 100; // 줄 사이 간격(선택)
  const delayLine2 = d1 + gap;

  useEffect(() => {
    const t = setTimeout(() => nav(nextPath, { replace: true }), delayMs);
    return () => clearTimeout(t);
  }, [nav, nextPath, delayMs]);

  return (
    <S.Container>
      <S.Mascot src="/mascot.png" alt="앱 마스코트" />
      <S.TextBox>
        <S.TextLoaderLine
          $text={line1}
          $steps={steps1}
          $durationMs={d1}
          $delayMs={0}
        />
        <S.TextLoaderLine
          $text={line2}
          $steps={steps2}
          $durationMs={d2}
          $delayMs={delayLine2}
        />
      </S.TextBox>
    </S.Container>
  );
};

export default LoadingPage;
