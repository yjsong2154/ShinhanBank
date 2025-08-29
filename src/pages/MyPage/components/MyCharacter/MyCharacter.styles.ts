import styled from 'styled-components';

export const Container = styled.section`
  padding: 15px;
  background-color: #f7f6ff;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const CharacterWrapper = styled.div`
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

export const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CharacterName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 5px;
`;

export const CharacterLevel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 10px;
`;

export const PointInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
`;

export const Point = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 5px;
`;

export const NextLevel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
`;