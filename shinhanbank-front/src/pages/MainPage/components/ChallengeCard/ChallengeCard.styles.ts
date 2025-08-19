import styled from "styled-components";

export const Container = styled.section`
  position: relative;
  padding: 20px;
  background-color: #f9d8ff;
  border-radius: 25px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
`;

export const TitleIcon = styled.img`
  position: absolute;
  top: -30px;
  left: -5px;
  width: 75px;
  height: 75px;
  font-size: 20px;
  margin-right: 8px;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextWrapper = styled.div`
  flex: 1;
  padding-right: 10px;
`;

export const ChallengeTitle = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textChallenge};
  font-weight: bold;
  margin: 0 0 5px;
`;

export const ChallengeDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textChallenge};
  margin: 0 0 10px;
`;

export const ChallengeInfo = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textChallenge};
  span:not(:last-child) {
    margin-right: 10px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 참여자 왼쪽, 버튼 오른쪽 */
  margin-top: 8px;
  gap: 12px;
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
`;

export const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textChallenge};
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0;
`;
