import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const ProfileInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

export const StudentId = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0;
`;

export const DetailInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const InfoBox = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  flex: 1;
`;

export const InfoTitle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0 0 5px;
`;

export const InfoContent = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;