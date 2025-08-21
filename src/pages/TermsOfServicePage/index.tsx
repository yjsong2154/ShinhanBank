import BackButton from "../../components/BackButton/BackButton";
import * as S from "./TermsOfServicePage.styles";

const TermsOfServicePage = () => {
  return (
    <S.Container>
      <S.Header>
        <BackButton />
        <S.Title>이용 약관</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>제1조 (목적)</S.SectionTitle>
          <S.Paragraph>
            본 약관은 신한은행 챌린지 서비스(이하 "서비스")를 이용함에 있어
            신한은행 챌린지와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로
            합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제2조 (용어의 정의)</S.SectionTitle>
          <S.Paragraph>
            ① "서비스"라 함은 이용자가 접속하여 이용하는 신한은행 챌린지 웹/앱
            서비스 및 관련 서비스를 의미합니다.
            <br />② "이용자"라 함은 서비스에 접속하여 본 약관에 따라 서비스를
            이용하는 회원 및 비회원을 말합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제3조 (약관의 효력 및 변경)</S.SectionTitle>
          <S.Paragraph>
            ① 본 약관은 서비스에 게시하거나 기타의 방법으로 이용자에게
            공지함으로써 효력이 발생합니다.
            <br />② 신한은행 챌린지는 약관의 규제에 관한 법률 등 관련 법령을
            위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
          </S.Paragraph>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default TermsOfServicePage;
