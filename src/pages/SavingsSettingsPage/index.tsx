import React, { useState } from "react";
import { savingsDetail } from "../../api/mockDataSaving";
import * as S from "./SavingsSettingsPage.styles";
import BackButton from "../../components/BackButton/BackButton";

const SavingsSettingsPage = () => {
  const [title, setTitle] = useState(savingsDetail.title); // 이름 상태 추가
  const [description, setDescription] = useState(savingsDetail.description);
  const [targetAmount, setTargetAmount] = useState(
    savingsDetail.targetAmount.toString()
  );

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
