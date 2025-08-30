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

// 하단 보조 문구 (필수 아님)
export const HelperText = styled.p`
  margin: 12px 0 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  text-align: center;
`;
