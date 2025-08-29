import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsSettingsPage.styles";
import BackButton from "../../components/BackButton/BackButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const SavingsSettingsPage = () => {
  const { data, loading, error } = useSavingsDetail();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.bucket.name);
      setDescription(data.bucket.description);
      setTargetAmount(data.bucket.target_amount.toString());
    }
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetAmount(e.target.value);
  };

  const handleTitleSubmit = () => {
    // TODO: 이름 변경 API 호출 로직
    console.log("이름 변경:", title);
    alert("이름이 변경되었습니다!");
  };

  const handleDescriptionSubmit = () => {
    // TODO: 설명 변경 API 호출 로직
    console.log("설명 변경:", description);
    alert("설명이 변경되었습니다!");
  };

  const handleAmountSubmit = () => {
    // TODO: 목표 금액 변경 API 호출 로직
    console.log("목표 금액 변경:", targetAmount);
    alert("목표 금액이 변경되었습니다!");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton />
        <S.Title>적금통 설정</S.Title>
      </S.Header>

      <S.Section>
        <S.SectionTitle>저축통 이름 변경</S.SectionTitle>
        <S.Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="새로운 이름을 입력하세요"
        />
        <S.Button onClick={handleTitleSubmit}>확인</S.Button>
      </S.Section>

      <S.Section>
        <S.SectionTitle>캐릭터 꾸미기</S.SectionTitle>
        <S.ComingSoon>✨ 디자인이 나오면 구현할 예정입니다. ✨</S.ComingSoon>
      </S.Section>

      <S.Section>
        <S.SectionTitle>저축통 설명 변경</S.SectionTitle>
        <S.DescriptionInput
          value={description}
          onChange={handleDescriptionChange}
          placeholder="새로운 설명을 입력하세요"
        />
        <S.Button onClick={handleDescriptionSubmit}>확인</S.Button>
      </S.Section>

      <S.Section>
        <S.SectionTitle>목표 금액 변경</S.SectionTitle>
        <S.Input
          type="number"
          value={targetAmount}
          onChange={handleAmountChange}
          placeholder="새로운 목표 금액을 입력하세요"
        />
        <S.Button onClick={handleAmountSubmit}>확인</S.Button>
      </S.Section>
    </S.Container>
  );
};

export default SavingsSettingsPage;