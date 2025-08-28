import styled from "styled-components";

export const Container = styled.section`
  margin-bottom: 20px;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;                
  a {
    display: block;          
    text-decoration: none;
    color: inherit;
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
