import styled from "styled-components";

export const Container = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const UniversityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;

export const UniversityName = styled.span`
  font-size: 14px;
  font-weight: 450;
  color: #473350;
`;

export const UnivLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

/* 아래쪽: 닉네임 + 이메일 */
export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

export const StudentId = styled.p`
  font-size: 14px;
  color: #84708d;
  margin: 0;
`;
