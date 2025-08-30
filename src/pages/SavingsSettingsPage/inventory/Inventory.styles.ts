/**
 * 인벤토리 페이지 스타일 정의
 */
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 10px;
  max-width: 500px;
  margin: 0 auto;
  background: #f9f8ff;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 10px 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #473350;
  margin: 0;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  font-size: 16px;
  padding: 40px 20px;
`;

export const CharacterSection = styled.section`
  background: #f7f6ff;
  border-radius: 18px;
  padding: 24px 16px 6px;
  text-align: center;
`;

export const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;   /* 이름과 버튼 사이 간격 */
  margin-bottom: 12px;
`;

export const CharacterWrapper = styled.div`
  --size: clamp(140px, 40vw, 180px);
  --thickness: 0px;
  
  width: var(--size);
  height: var(--size);
  margin: 0 auto 16px;
  position: relative;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #e6e2ff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px rgba(154, 119, 255, 0.18);
`;

export const CharacterName = styled.span`
  font-size: 18px;
  font-weight: 750;
  color: #473350;
  margin-bottom: 12px;
`;

export const SaveButton = styled.button`
  background: #9a77ff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 4px;

  &:hover {
    background: #8b68ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(154, 119, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #d0d0d0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${({ $active }) => ($active ? "#9a77ff" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#84708d")};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#8b68ff" : "#f7f6ff")};
  }
`;

export const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  padding: 8px;
`;

export const InventoryItem = styled.div<{ $selected?: boolean; $disabled?: boolean }>`
  background: ${({ $selected, $disabled }) => 
    $disabled ? "#f5f5f5" : $selected ? "#f7f6ff" : "#ffffff"};
  border: 2px solid ${({ $selected, $disabled }) => 
    $disabled ? "#d0d0d0" : $selected ? "#9a77ff" : "#e6e2ff"};
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${({ $selected, $disabled }) =>
    $selected && !$disabled &&
    `
    box-shadow: 0 4px 16px rgba(154, 119, 255, 0.25);
    transform: translateY(-1px);
    
    &::after {
      content: "✓";
      position: absolute;
      top: 8px;
      right: 8px;
      background: #9a77ff;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
  `}

  ${({ $disabled }) =>
    !$disabled &&
    `
    &:hover {
      border-color: #9a77ff;
      box-shadow: 0 4px 12px rgba(154, 119, 255, 0.15);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `}

  ${({ $disabled }) =>
    $disabled &&
    `
    &::before {
      content: "🔒";
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 14px;
      opacity: 0.7;
    }
  `}
`;

export const ItemImage = styled.img<{ $isNone?: boolean; $disabled?: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${({ $isNone }) => ($isNone ? "#ffffff" : "transparent")};
  filter: ${({ $disabled }) => ($disabled ? "grayscale(100%)" : "none")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const ItemName = styled.span<{ $disabled?: boolean }>`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $disabled }) => ($disabled ? "#a0a0a0" : "#473350")};
`;

export const ItemDescription = styled.span<{ $disabled?: boolean }>`
  display: block;
  font-size: 10px;
  font-weight: 400;
  color: ${({ $disabled }) => ($disabled ? "#b0b0b0" : "#84708d")};
  margin-top: 4px;
  line-height: 1.3;
  text-align: center;
`;

export const AchievementMessage = styled.div`
  background: #f7f6ff;
  border: 1px solid #e6e2ff;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 24px;
  text-align: center;
  color: #6c56b0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;