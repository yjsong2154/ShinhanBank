import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 10px;
  max-width: 500px;
  margin: 0 auto;
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
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  margin-top: 30px;
`;