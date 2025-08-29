import styled from "styled-components";

export const Container = styled.section`
  padding: 15px;
  background-color: #f7f6ff;
  border-radius: 25px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #473350;
  margin-bottom: 15px;
`;

export const TitleIcon = styled.span`
  width: 20px;
  margin-right: 20px;
`;

/* --- 가로 스크롤: 한 장만 중앙에, 좌우로 넘김 --- */
export const ListWrapper = styled.div`
  margin-top: 14px;

  /* 양 옆 페이드(옵션) */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    black 16px,
    black calc(100% - 16px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    black 16px,
    black calc(100% - 16px),
    transparent 100%
  );
`;

export const ScrollRow = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 70px 6% 20px;

  scroll-snap-type: x mandatory;
  scroll-padding: 10%; /* 스냅 기준 패딩 */

  overscroll-behavior-x: contain;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const Card = styled.article`
  position: relative;
  flex: 0 0 90%;
  max-width: 520px;
  margin: 0 auto;
  padding-top: 70px;

  /* 중앙 스냅 */
  scroll-snap-align: center;

  background: #eee3fa;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const CharacterBubble = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > * {
    width: 100%;
    height: 100%;
  }
`;

export const CardBody = styled.div`
  padding: 12px 14px 14px;
`;

export const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #473350;
  margin: 0px 5px 20px;
  text-align: center;
`;

export const CardDesc = styled.p`
  margin: 0 5px 30px;
  font-size: 12px;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.textChallenge};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Progress = styled.div`
  position: relative;
  height: 20px;
  border-radius: 999px;
  background: #efeafc;
  margin: 40px 5px 15px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  border-radius: 999px;
  background: #9a77ff;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 11px;
  font-weight: 700;
  color: #9a77ff;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 5px;
  font-size: 12px;
  color: #473350;
`;

export const MetaItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: #473350;
  font-size: 12px;
  padding: 4px 6px;
  cursor: pointer;
  &:active {
    transform: translateY(0.5px);
  }
`;

export const MetaIcon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
  user-select: none;
  pointer-events: none;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  color: #473350; // theme.colors.gray_m
  background-color: #f7f6ff; // theme.colors.gray_l
  border-radius: 8px;
  font-size: 1rem;
`;