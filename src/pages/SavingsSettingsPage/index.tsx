import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsSettingsPage.styles";
import BackButton from "../../components/BackButton/BackButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { API_URL } from "../../api/config";
import AlertDialog from '../../components/common/AlertDialog/AlertDialog';
import InventoryForSaving from "./inventory";

const SavingsSettingsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useSavingsDetail();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [characterItemId, setCharacterItemId] = useState<number | null>(null);
  const [outfitItemId, setOutfitItemId] = useState<number | null>(null);
  const [hatItemId, setHatItemId] = useState<number | null>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setAlertMessage("");
  };

  useEffect(() => {
    if (data && data.bucket) {
      setTitle(data.bucket.name);
      setDescription(data.bucket.description);
      setCharacterItemId(parseInt(data.bucket.owner.character.character_item.id));
      setOutfitItemId(parseInt(data.bucket.owner.character.outfit_item.id));
      setHatItemId(parseInt(data.bucket.owner.character.hat_item.id));
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

  const handleCharacterSelectionChange = (selection: { character: number | null; outfit: number | null; hat: number | null }) => {
    if (selection.character !== null) setCharacterItemId(selection.character);
    if (selection.outfit !== null) setOutfitItemId(selection.outfit);
    if (selection.hat !== null) setHatItemId(selection.hat);
  };

  const handleSettingsSubmit = async () => {
    if (!id) {
      showAlert("적금통 ID를 찾을 수 없습니다.");
      return;
    }

    const bodyData: Record<string, unknown> = {
  name: title,
  description: description,
  character_item_id: characterItemId,
};

// 조건에 따라 outfit_item_id와 hat_item_id 추가
if (outfitItemId !== 0) {
  bodyData.outfit_item_id = outfitItemId;
}

if (hatItemId !== 0) {
  bodyData.hat_item_id = hatItemId;
}

    console.log("Submitting settings:", bodyData);

    try {
      const response = await fetch(`${API_URL}/bucket/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (response.ok) {
        showAlert("적금통 정보가 성공적으로 변경되었습니다.");
      } else {
        showAlert(`오류: ${result.message || '알 수 없는 오류가 발생했습니다.'}`);
      }
    } catch (err) {
      console.error("Failed to update savings settings:", err);
      showAlert("서버와 통신 중 오류가 발생했습니다.");
    }
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
      </S.Section>

      <S.Section>
      <S.SectionTitle>캐릭터 꾸미기</S.SectionTitle>
      {data.bucket.owner.character && (
      <InventoryForSaving
        onSelectionChange={handleCharacterSelectionChange}
        initialCharacter={{
          ...data.bucket.owner.character,
          character_item: { id: parseInt(data.bucket.owner.character.character_item.id) },
          outfit_item: { id: data.bucket.owner.character.outfit_item?.id ? parseInt(data.bucket.owner.character.outfit_item.id) : 0 },
          hat_item: { id: data.bucket.owner.character.hat_item?.id ? parseInt(data.bucket.owner.character.hat_item.id) : 0 },
        }}
      />
      )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>저축통 설명 변경</S.SectionTitle>
        <S.DescriptionInput
          value={description}
          onChange={handleDescriptionChange}
          placeholder="새로운 설명을 입력하세요"
        />
      </S.Section>
      
      <S.Button onClick={handleSettingsSubmit}>
        변경사항 저장
      </S.Button>

      <AlertDialog
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
    </S.Container>
  );
};

export default SavingsSettingsPage;