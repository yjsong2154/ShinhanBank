import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 1. useParams 임포트
import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsSettingsPage.styles";
import BackButton from "../../components/BackButton/BackButton";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { API_URL } from "../../api/config";
import AlertDialog from '../../components/common/AlertDialog/AlertDialog'; // Import the new component

const SavingsSettingsPage = () => {
  // 2. useParams를 사용하여 URL에서 id 가져오기
  const { id } = useParams<{ id: string }>(); 
  const { data, loading, error } = useSavingsDetail(); // useSavingsDetail 훅에 id 전달

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // 3. 캐릭터 아이템 ID를 위한 상태 추가
  const [characterItemId, setCharacterItemId] = useState<number | null>(null);
  const [outfitItemId, setOutfitItemId] = useState<number | null>(null);
  const [hatItemId, setHatItemId] = useState<number | null>(null);

  // State for AlertDialog
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to open alert dialog
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  // Function to close alert dialog
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setAlertMessage("");
  };

  useEffect(() => {
    if (data && data.bucket) {
      setTitle(data.bucket.name);
      setDescription(data.bucket.description);
      // 4. 컴포넌트 마운트 시 기존 캐릭터 아이템 ID 설정
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

  // 5. 모든 변경사항을 한번에 제출하는 함수
  const handleSettingsSubmit = async () => {
    if (!id) {
      showAlert("적금통 ID를 찾을 수 없습니다.");
      return;
    }

    // 보낼 데이터 객체 생성
    const bodyData = {
      name: title,
      description: description,
      character_item_id: characterItemId,
      outfit_item_id: outfitItemId,
      hat_item_id: hatItemId,
    };

    try {
      // API 호출 (엔드포인트는 실제 프로젝트에 맞게 수정이 필요할 수 있습니다.)
      const response = await fetch(`${API_URL}/bucket/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization 헤더 등이 필요하다면 여기에 추가해야 합니다.
          // "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert("적금통 정보가 성공적으로 변경되었습니다.");
        // 선택: 변경 후 상세 페이지로 이동하거나, 데이터를 새로고침 할 수 있습니다.
      } else {
        // API가 보내주는 에러 메시지를 사용자에게 보여줍니다.
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
        {/* 이름 변경 버튼 삭제 */}
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
        {/* 설명 변경 버튼 삭제 */}
      </S.Section>
      
      {/* 6. 통합 저장 버튼 추가 */}
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