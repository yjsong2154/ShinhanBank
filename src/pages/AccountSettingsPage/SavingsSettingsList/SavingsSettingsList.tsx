import { useNavigate } from "react-router-dom";
import useSavings from "../../../hooks/useSavings";
import Character from "../../../components/Character/Character";
import * as S from "./SavingsSettingsList.styles";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const SavingsSettingsList = () => {
  const navigate = useNavigate();
  const { data: savingsList, loading, error } = useSavings();

  const handleSavingsClick = (id: string) => {
    navigate(`/save-settings/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.Container>
      <S.SectionTitle>적금통 설정</S.SectionTitle>
      <S.List>
        {savingsList && savingsList.map((savings) => (
          <S.Item key={savings.id} onClick={() => handleSavingsClick(savings.id)}>
            <S.CharacterWrapper>
              <Character 
                id="0"
              />
            </S.CharacterWrapper>
            <S.InfoWrapper>
              <S.Title>{savings.name}</S.Title>
              <S.ProgressInfo>{savings.current_progress}% 완료</S.ProgressInfo>
            </S.InfoWrapper>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default SavingsSettingsList;
