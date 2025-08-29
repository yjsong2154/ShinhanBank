import BackButton from "../../components/BackButton/BackButton";
import * as S from "./PrivacyPolicyPage.styles";

const PrivacyPolicyPage = () => {
  return (
    <S.Container>
      <S.Header>
        <BackButton />
        <S.Title>개인정보 처리 방침</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>제1조 (개인정보의 처리 목적)</S.SectionTitle>
          <S.Paragraph>
            신한은행 챌린지 서비스는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
            않으며, 이용 목적이 변경될 경우에는 「개인정보 보호법」 제18조에
            따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제2조 (개인정보의 처리 및 보유기간)</S.SectionTitle>
          <S.Paragraph>
            신한은행 챌린지 서비스는 법령에 따른 개인정보 보유∙이용기간 또는
            정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유∙이용기간
            내에서 개인정보를 처리 및 보유합니다.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>제3조 (개인정보의 제3자 제공)</S.SectionTitle>
          <S.Paragraph>
            신한은행 챌린지 서비스는 원칙적으로 정보주체의 개인정보를
            제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며,
            정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및
            제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </S.Paragraph>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default PrivacyPolicyPage;
