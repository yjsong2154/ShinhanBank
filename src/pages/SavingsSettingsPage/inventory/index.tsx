/**
 * 인벤토리 페이지: 캐릭터와 의상을 선택/꾸미기 위한 화면
 */
import { useState, useEffect } from "react";
import useInventory from "../../../hooks/useInventory";
import type { InventoryItem } from "../../../hooks/useInventory";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Character from "../../../components/Character/Character";
import * as S from "./Inventory.styles";

type TabType = "character" | "outfit" | "hat";

interface InventoryForSavingProps {
  onSelectionChange: (selection: { character: number | null; outfit: number | null; hat: number | null }) => void;
  initialCharacter: {
    character_item: { id: number };
    outfit_item: { id: number };
    hat_item: { id: number };
  };
}

const InventoryForSaving = ({ onSelectionChange, initialCharacter }: InventoryForSavingProps) => {
  const { data: inventory, loading: inventoryLoading, error: inventoryError } = useInventory();
  const [activeTab, setActiveTab] = useState<TabType>("character");
  
  // 선택된 아이템들의 상태 관리
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [selectedHat, setSelectedHat] = useState<number | null>(null);

  useEffect(() => {
    onSelectionChange({
      character: selectedCharacter,
      outfit: selectedOutfit,
      hat: selectedHat,
    });
  }, [selectedCharacter, selectedOutfit, selectedHat, onSelectionChange]);


  if (inventoryLoading) {
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );
  }

  if (inventoryError || !inventory) {
    return (
      <S.Container>
        <S.ErrorMessage>
          {inventoryError || "데이터를 불러올 수 없습니다."}
        </S.ErrorMessage>
      </S.Container>
    );
  }

  const currentCharacterId = selectedCharacter !== null ? selectedCharacter : initialCharacter.character_item.id;
  const currentOutfitId = selectedOutfit !== null ? selectedOutfit : initialCharacter.outfit_item.id;
  const currentHatId = selectedHat !== null ? selectedHat : initialCharacter.hat_item.id;

  return (
    <S.Container>
      {/* 캐릭터 디스플레이 */}
      <S.CharacterSection>
        <S.CharacterWrapper>
          <Character
            character={currentCharacterId}
            cloth={currentOutfitId}
            hat={currentHatId}
          />
        </S.CharacterWrapper>

        <S.CharacterInfo>
        <S.CharacterName>
          {inventory.items_by_type.character.items.find(char => char.id === currentCharacterId)?.name || ""}
        </S.CharacterName>
        </S.CharacterInfo>
      </S.CharacterSection>

      {/* 탭 네비게이션 */}
      <S.TabContainer>
        <S.TabButton 
          $active={activeTab === "character"} 
          onClick={() => setActiveTab("character")}
        >
          캐릭터
        </S.TabButton>
        <S.TabButton 
          $active={activeTab === "outfit"} 
          onClick={() => setActiveTab("outfit")}
        >
          의상
        </S.TabButton>
        <S.TabButton 
          $active={activeTab === "hat"} 
          onClick={() => setActiveTab("hat")}
        >
          모자
        </S.TabButton>
      </S.TabContainer>

      {/* 인벤토리 아이템 그리드 */}
      <S.InventoryGrid>
        {activeTab === "character" && (
          <CharacterTab 
            items={inventory.items_by_type.character.items}
            selectedCharacter={selectedCharacter} 
            onCharacterSelect={setSelectedCharacter} 
          />
        )}
        {activeTab === "outfit" && (
          <OutfitTab 
            items={inventory.items_by_type.outfit.items}
            selectedOutfit={selectedOutfit} 
            onOutfitSelect={setSelectedOutfit} 
          />
        )}
        {activeTab === "hat" && (
          <HatTab 
            items={inventory.items_by_type.hat.items}
            selectedHat={selectedHat} 
            onHatSelect={setSelectedHat} 
          />
        )}
      </S.InventoryGrid>

      <S.AchievementMessage>
        업적을 달성해서 더 많은 아이템을 해금하세요
      </S.AchievementMessage>
    </S.Container>
  );
};

// 이미지 매핑 함수들
const getCharacterImage = (id: number) => {
  const imageMap: Record<number, string> = {
    1: "/character/ssol.png",
    2: "/character/moli.png", 
    3: "/character/rino.png",
    10: "/character/pli.png"
  };
  return imageMap[id] || "/character/ssol.png";
};

const getOutfitImage = (id: number) => {
  const imageMap: Record<number, string> = {
    0: "/clothes/none.png",
    4: "/clothes/schooljumper.png",
    5: "/clothes/explorer.png", 
    6: "/clothes/basketjumper.png",
    11: "/clothes/hoodie.png"
  };
  return imageMap[id] || "/clothes/none.png";
};

const getHatImage = (id: number) => {
  const imageMap: Record<number, string> = {
    0: "/clothes/none.png",
    7: "/clothes/blackhat.png",
    8: "/clothes/ballcap.png",
    9: "/clothes/explorer_cap.png", 
    12: "/clothes/beanie.png"
  };
  return imageMap[id] || "/clothes/none.png";
};

// 캐릭터 탭 컴포넌트
interface CharacterTabProps {
  items: InventoryItem[];
  selectedCharacter: number | null;
  onCharacterSelect: (id: number) => void;
}

const CharacterTab = ({ items, selectedCharacter, onCharacterSelect }: CharacterTabProps) => {
  return (
    <>
      {items.map((item) => (
        <S.InventoryItem 
          key={item.id} 
          $selected={selectedCharacter === item.id}
          $disabled={!item.is_owned}
          onClick={() => item.is_owned && onCharacterSelect(item.id)}
        >
          <S.ItemImage 
            src={getCharacterImage(item.id)} 
            alt={item.name}
            $disabled={!item.is_owned}
          />
          <S.ItemName $disabled={!item.is_owned}>{item.name}</S.ItemName>
          <S.ItemDescription $disabled={!item.is_owned}>{item.description}</S.ItemDescription>
        </S.InventoryItem>
      ))}
    </>
  );
};

// 의상 탭 컴포넌트
interface OutfitTabProps {
  items: InventoryItem[];
  selectedOutfit: number | null;
  onOutfitSelect: (id: number) => void;
}

const OutfitTab = ({ items, selectedOutfit, onOutfitSelect }: OutfitTabProps) => {
  // "없음" 아이템을 수동으로 추가
  const outfitItems = [
    { id: 0, name: "없음", description: "", is_owned: true } as InventoryItem,
    ...items
  ];

  return (
    <>
      {outfitItems.map((item) => (
        <S.InventoryItem 
          key={item.id} 
          $selected={selectedOutfit === item.id}
          $disabled={!item.is_owned}
          onClick={() => item.is_owned && onOutfitSelect(item.id)}
        >
          <S.ItemImage 
            src={getOutfitImage(item.id)} 
            alt={item.name}
            $isNone={item.id === 0}
            $disabled={!item.is_owned}
          />
          <S.ItemName $disabled={!item.is_owned}>{item.name}</S.ItemName>
        </S.InventoryItem>
      ))}
    </>
  );
};

// 모자 탭 컴포넌트
interface HatTabProps {
  items: InventoryItem[];
  selectedHat: number | null;
  onHatSelect: (id: number) => void;
}

const HatTab = ({ items, selectedHat, onHatSelect }: HatTabProps) => {
  // "없음" 아이템을 수동으로 추가
  const hatItems = [
    { id: 0, name: "없음", description: "", is_owned: true } as InventoryItem,
    ...items
  ];

  return (
    <>
      {hatItems.map((item) => (
        <S.InventoryItem 
          key={item.id} 
          $selected={selectedHat === item.id}
          $disabled={!item.is_owned}
          onClick={() => item.is_owned && onHatSelect(item.id)}
        >
          <S.ItemImage 
            src={getHatImage(item.id)} 
            alt={item.name}
            $isNone={item.id === 0}
            $disabled={!item.is_owned}
          />
          <S.ItemName $disabled={!item.is_owned}>{item.name}</S.ItemName>
        </S.InventoryItem>
      ))}
    </>
  );
};

export default InventoryForSaving;