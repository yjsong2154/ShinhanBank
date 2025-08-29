import styled from 'styled-components';

/**
 * 알림 아이템 스와이프 UI 스타일 정의
 */

export const Container = styled.div`
  /* 스와이프 컨테이너: 모서리 라운드 및 내부 콘텐츠 클리핑 */
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const DeleteAction = styled.button`
  /* 우측 고정 삭제 버튼 영역 */
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 100px; /* 미세 조정: 콘텐츠가 닫힌 상태에서 붉은색이 비치지 않도록 살짝 축소 */
  background-color: #e74c3c;
  color: #ffffff;
  border-radius: 10px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const SwipeContent = styled.div`
  /* 카드 비주얼을 이 레이어에 부여하여 기본 상태에서 삭제 배경이 보이지 않도록 처리 */
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export const Type = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const Content = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin: 0 0 10px;
`;

export const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  align-self: flex-end;
`;