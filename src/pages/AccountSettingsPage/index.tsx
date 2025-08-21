import BackButton from "../../components/BackButton/BackButton";
import * as S from "./AccountSettingsPage.styles";
import ThemeSettings from "./ThemeSettings/ThemeSettings";
import MainCharacterSettings from "./MainCharacterSettings/MainCharacterSettings";
import SavingsSettingsList from "./SavingsSettingsList/SavingsSettingsList";

const AccountSettingsPage = () => {
  return (
    <S.Container>
      <S.Header>
        <BackButton />
        <S.Title>계정 관리</S.Title>
      </S.Header>

      <MainCharacterSettings />
      <ThemeSettings />
      <SavingsSettingsList />
    </S.Container>
  );
};

export default AccountSettingsPage;
