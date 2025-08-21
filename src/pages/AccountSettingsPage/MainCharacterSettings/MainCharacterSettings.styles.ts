import styled from "styled-components";

export const Container = styled.section`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MainCharacterWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
`;

export const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

export const CharacterOption = styled.div<{ $isSelected: boolean }>`
  background-color: #ffffff;
  border: 2px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : "transparent"};
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color 0.2s ease-in-out;
`;

export const CharacterImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

export const CharacterName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
