import { useTheme } from "../../../contexts/ThemeContext";
import * as S from "./ThemeSettings.styles";

const ThemeSettings = () => {
  const { setTheme } = useTheme();

  return (
    <S.Container>
      <S.SectionTitle>테마 설정</S.SectionTitle>
      <S.ThemeButtons>
        <S.ThemeButton onClick={() => setTheme("light")}>
          <S.ColorBlock color1="#6a4ff2" color2="#f7f6ff" color3="#333333" />
          <S.ThemeName>라이트</S.ThemeName>
        </S.ThemeButton>
        <S.ThemeButton onClick={() => setTheme("dark")}>
          <S.ColorBlock color1="#473350" color2="#875E99" color3="#ffffff" />
          <S.ThemeName>다크</S.ThemeName>
        </S.ThemeButton>
        <S.ThemeButton onClick={() => setTheme("custom")}>
          <S.ColorBlock color1="#875E99" color2="#f7f6ff" color3="#333333" />
          <S.ThemeName>커스텀</S.ThemeName>
        </S.ThemeButton>
      </S.ThemeButtons>
    </S.Container>
  );
};

export default ThemeSettings;
