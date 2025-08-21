import styled from "styled-components";

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(60px, 1fr)); /* 2-1-3 순서 */
  justify-items: center;
  gap: 16px;
  background: #f7f6ff;
  border-radius: 12px;
  padding: 16px 12px;
`;

export const Item = styled.div<{ first?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: ${({ first }) => (first ? "0" : "10px")};
`;

export const Avatar = styled.div<{ first?: boolean }>`
  position: relative;
  width: ${({ first }) => (first ? "80px" : "65px")};
  height: ${({ first }) => (first ? "80px" : "65px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #654772;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textChallenge};
  text-align: center;
  line-height: 1.2;
`;
