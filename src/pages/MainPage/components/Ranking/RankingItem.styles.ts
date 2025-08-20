import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

export const Rank = styled.span`
  width: 25px;
  font-weight: bold;
  text-align: center;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const Name = styled.span`
  flex: 1;
  font-weight: 500;
`;

export const Amount = styled.span`
  font-weight: bold;
`;

export const CrownIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;