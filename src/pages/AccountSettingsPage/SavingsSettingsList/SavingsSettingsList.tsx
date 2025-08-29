import { useNavigate } from "react-router-dom";
import { myPageData } from "../../../api/mockData";
import Character from "../../../components/Character/Character";
import * as S from "./SavingsSettingsList.styles";

const SavingsSettingsList = () => {
  const navigate = useNavigate();

  const handleSavingsClick = () => {
    navigate("/savings"); // /savings 페이지로 이동
  };

  return (
    <S.Container>
      <S.SectionTitle>적금통 설정</S.SectionTitle>
      <S.List>
        {myPageData.savingsList.map((savings) => (
          <S.Item key={savings.id} onClick={handleSavingsClick}>
            <S.CharacterWrapper>
              {/* TODO: 각 저축통의 캐릭터 정보를 API로 받아와야 합니다. */}
              <Character id="0" />
            </S.CharacterWrapper>
            <S.InfoWrapper>
              <S.Title>{savings.title}</S.Title>
              <S.ProgressInfo>{savings.progress}% 완료</S.ProgressInfo>
            </S.InfoWrapper>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default SavingsSettingsList;
