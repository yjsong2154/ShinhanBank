import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 1000;

  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 500px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-sizing: border-box;
  height: calc(60px + env(safe-area-inset-bottom)); /* iOS 홈바 영역 */
  padding-bottom: env(safe-area-inset-bottom);

  background-color: #fff;
  border-top: 1px solid #e0e0e0;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
`;

export const Label = styled.p`
  font-size: 12px;
  color: #333;
  margin: 0;
`;
