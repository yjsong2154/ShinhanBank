import styled from "styled-components";

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const FeedList = styled.div`
  //padding: 15px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.gray_m};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
`;
