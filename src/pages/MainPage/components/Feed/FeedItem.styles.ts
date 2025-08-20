import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  gap: 30px;
  background-color: #f7f6ff;
  border-radius: 25px;
  padding: 20px 30px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 25%;
  max-width: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CharacterWrapper = styled.div`
  width: 85%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProgressCircle = styled.div<{ progress: number }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: conic-gradient(
    #b699ff ${({ progress }) => progress}%,
    #d8d4e3 ${({ progress }) => progress}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoalText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textChallenge};
  text-align: center;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 5 0 0px;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const Author = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const Period = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.textChallenge};
`;

export const Content = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textChallenge};
  margin: 0 0 10px;
`;

export const ReactionInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  margin-top: auto;
  gap: 5px;
  width: max-content;
`;

export const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const ReactionIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReactionCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textChallenge};
`;
