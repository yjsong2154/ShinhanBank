import styled from "styled-components";

// 로그인 페이지의 컨테이너. 기존 페이지들과 동일한 최대 너비, 그라디언트 배경을 적용합니다.
export const Container = styled.div`
  padding: 20px 20px;
  max-width: 500px;
  margin: 0 auto;

  background: linear-gradient(
    135deg,
    rgba(97, 104, 251, 0.44) 0%,
    rgba(145, 105, 240, 0.45) 50%,
    rgba(200, 97, 229, 0.46) 100%
  );

  min-height: 100vh;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
`;

// 로그인 입력 영역 카드. 흰색 배경에 그림자를 주어 가독성을 높입니다.
export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

// 카드 상단 제목 영역
export const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: bold;
  color: #473350;
`;

// 부제 및 안내 문구
export const Subtitle = styled.p`
  margin: 0 0 24px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

// 폼 전체 래퍼
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 라벨 텍스트
export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

// 텍스트 인풋
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(71, 51, 80, 0.1);
  }
`;

// 로그인 버튼. 기존 테마 색상과 스타일을 최대한 맞춥니다.
export const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  margin-top: 8px;
`;

// 하단 보조 문구 (필수 아님)
export const HelperText = styled.p`
  margin: 12px 0 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightGray};
  text-align: center;
`;


