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

// 닉네임과 편집 아이콘을 같은 행으로 배치
export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EditIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const NameInput = styled.input`
  font-size: 18px;
  padding: 6px 10px;
  border: 1px solid #d0c7d6;
  border-radius: 8px;
  outline: none;
`;

export const ConfirmButton = styled.button`
  padding: 6px 10px;
  background: #5a3aa0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;
