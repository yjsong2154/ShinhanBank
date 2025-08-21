import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 10px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
`;

export const Section = styled.section`
  background-color: #f7f6ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

// Input 스타일 재사용을 위해 추가
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const ComingSoon = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;
