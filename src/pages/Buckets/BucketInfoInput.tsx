// 파일 목적: 적금통의 이름과 설명을 입력받는 단계. 이후 단계로 상태를 전달합니다.
// 주요 기능: 입력 필드 2개(이름/설명), 다음 버튼으로 FixedSavingInput로 이동
// 주의사항: 공백만 입력 방지, 기존 state(productId/type/days 등)와 병합하여 전달

import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

type AnyState = Record<string, unknown> | null | undefined;

const BucketInfoInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state as AnyState) || {};

  const [name, setName] = useState<string>("제 첫 적금통 입니다.");
  const [description, setDescription] = useState<string>("졸업할때까지 1억을 모으려고 합니다.");
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const isValid = useMemo(() => name.trim().length > 0 && description.trim().length > 0, [name, description]);

  const handleNext = () => {
    if (!isValid) return;
    navigate("/buckets/fixed/input", {
      state: {
        ...incoming,
        bucketName: name.trim(),
        bucketDescription: description.trim(),
        bucketPublic: isPublic,
      },
    });
  };

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>적금통 정보 입력</TopTitle>
        <div style={{ width: 24 }} />
      </TopBar>

      <Field>
        <Label htmlFor="bucket-name">이름</Label>
        <Input id="bucket-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="적금통 이름" />
      </Field>

      <Field>
        <Label htmlFor="bucket-desc">설명</Label>
        <TextArea id="bucket-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명을 입력하세요" />
      </Field>

      <Field>
        <Label htmlFor="bucket-public">공개 여부</Label>
        <ToggleRow>
          <ToggleLabel htmlFor="bucket-public">공개</ToggleLabel>
          <input id="bucket-public" type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </ToggleRow>
      </Field>

      <Bottom>
        <NextButton disabled={!isValid} onClick={handleNext}>다음</NextButton>
      </Bottom>
    </Container>
  );
};

export default BucketInfoInput;

// 스타일
const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 12px 16px 80px;
  box-sizing: border-box;
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
`;

const TopTitle = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0;
`;

const Label = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100px;
  resize: vertical;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
`;

const Bottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
`;

const NextButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  &:disabled { opacity: 0.4; }
`;


