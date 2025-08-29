import styled from "styled-components";

export const Container = styled.section`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ThemeButtons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 15px;
`;

export const ThemeButton = styled.button`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const ColorBlock = styled.div<{
  color1: string;
  color2: string;
  color3: string;
}>`
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: linear-gradient(
    45deg,
    ${(props) => props.color1} 0%,
    ${(props) => props.color1} 33%,
    ${(props) => props.color2} 33%,
    ${(props) => props.color2} 66%,
    ${(props) => props.color3} 66%,
    ${(props) => props.color3} 100%
  );
`;

export const ThemeName = styled.span`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;
