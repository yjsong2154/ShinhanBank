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
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const NotificationList = styled.div`
  padding: 0px;
`;
