// ChallengeHistory.styles.ts
import styled from "styled-components";

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const BigTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const ChallengeList = styled.div`
  border-radius: 12px;
  border: 1px solid #d8d4e3;
`;

export const ChallengeCard = styled.div`
  padding: 20px;
  background: #fff;
  border: 2px #ece7ff;
  border-radius: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const HeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textChallenge};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const NextPointer = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const Content = styled.p`
  margin: 10px 0 20px;
  font-size: 14px;
  line-height: 1.45;
  color: #4a4a4a;
`;

export const SubText = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 13px;
`;

export const RowEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
`;

export const Period = styled.span`
  margin-top: 15px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const Reward = styled.span`
  display: none;
  font-size: 13px;
  font-weight: 700;
`;

export const ChallengeItem = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ChallengeHeader = styled.div`
  display: flex;
  justify-content: space-between; /* 제목과 완료 사이 간격 */
  align-items: center;
  margin-bottom: 6px;
`;

export const ChallengeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textChallenge};
  margin-bottom: 10px;
`;

/* ----- Stamp UI ----- */
export const StampGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 기본은 한 줄에 7개
  gap: 10px;

  /* 화면이 작아지면 2줄로 */
  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr); // 첫 줄에 최대 4개
    grid-auto-rows: auto;
    justify-content: center;
  }
`;

export const StampItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const StampIcon = styled.img`
  width: 48px;
  height: 48px;
`;

export const DateText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const RightInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
`;
