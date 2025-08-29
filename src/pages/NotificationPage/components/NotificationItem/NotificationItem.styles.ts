import styled from 'styled-components';

export const Container = styled.div`
  /* 스와이프 컨테이너: 내부 콘텐츠를 잘라내기 위해 overflow hidden 적용 */
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const DeleteBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #e74c3c;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 24px;
  color: #ffffff;
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