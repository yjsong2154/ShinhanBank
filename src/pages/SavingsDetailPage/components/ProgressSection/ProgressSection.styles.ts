import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f6ff;
  border-radius: 12px;
  margin-top: 20px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

export const ProgressGraphic = styled.div`
  /*
    TODO: 여기에 진행률을 보여주는 시각적인 요소를 추가할 예정입니다.
    현재는 퍼센트 텍스트만 표시합니다.
  */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
`;

export const ProgressText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const AmountInfo = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
`;

export const CurrentAmount = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;

export const TargetAmount = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const RemainingAmount = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-top: 5px;
`;