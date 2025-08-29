import styled from "styled-components";

/* 컨테이너 – 완료면 그라데이션, 보더 없음 */
export const Container = styled.div<{ isCompleted: boolean }>`
  border: ${({ isCompleted }) => (isCompleted ? "0" : "2px solid #e2e2e2")};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;

  background: ${({ isCompleted }) =>
    isCompleted
      ? `linear-gradient(
          135deg,
          rgba(97, 104, 251, 0.44) 0%,
          rgba(145, 105, 240, 0.45) 50%,
          rgba(200, 97, 229, 0.46) 100%
        )`
      : "#fff"};

  box-shadow: ${({ isCompleted }) =>
    isCompleted
      ? "0 6px 18px rgba(154,119,255,.18)"
      : "0 1px 0 rgba(0,0,0,.02)"};
`;

/* 좌우 2열 */
export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const LeftCol = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

export const RightCol = styled.div`
  flex: 0 0 140px; /* 고정폭(원하는 값으로 조정 가능) */
  display: flex;
  justify-content: flex-end;

  @media (max-width: 560px) {
    align-self: flex-end;
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3<{ isCompleted: boolean }>`
  margin: 0 0 8px 0;
  font-weight: 700;
`;

export const Description = styled.p<{ isCompleted: boolean }>`
  margin: 0;
  line-height: 1.45;
`;

export const RewardCard = styled.div<{ $isCompleted: boolean }>`
  width: 140px;
  padding: 12px 12px 10px;
  border-radius: 14px;
  background: ${({ $isCompleted }) =>
    $isCompleted ? "rgba(255,255,255,0.15)" : "#fafafa"};
  border: ${({ $isCompleted }) =>
    $isCompleted ? "1px solid rgba(255,255,255,0.3)" : "1px solid #e5e5ea"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const RewardCharacter = styled.div<{ $isCompleted: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #fff;

  img,
  svg {
    width: 64px;
    height: 64px;
    object-fit: contain;
    /* 완료 X → 흑백 */
    filter: ${({ $isCompleted }) =>
      $isCompleted ? "none" : "grayscale(100%)"};
  }
`;

export const RewardName = styled.div<{ $isCompleted: boolean }>`
  font-size: 14px;
  font-weight: 700;
`;

export const CompletedBadge = styled.span`
  margin-top: 2px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #9a77ff;
  color: #fff;
`;
