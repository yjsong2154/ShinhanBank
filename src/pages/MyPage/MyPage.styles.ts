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

export const AccountSetting = styled.div`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 15px;
  margin-top: 30px;
`;

export const SettingItem = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

export const LogoutItem = styled(SettingItem)`
  color: red; /* 빨간색으로 변경 */
`;