import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 20px;
  max-width: 500px;
  margin: 0 auto;

  /* 배경 그라디언트 */
  background: linear-gradient(
    135deg,
    rgba(97, 104, 251, 0.44) 0%,
    rgba(145, 105, 240, 0.45) 50%,
    rgba(200, 97, 229, 0.46) 100%
  );

  min-height: 100vh;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #473350;
`;

export const CreateSavingsButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-top: 30px;
`;
