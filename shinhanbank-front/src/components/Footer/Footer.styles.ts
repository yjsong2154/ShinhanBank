import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
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