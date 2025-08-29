// 파일 목적: terms 문서 PDF 뷰어. 라우트 파라미터(docId)로 문서 메타 조회 후 iframe으로 표시.
// 주요 섹션: 헤더(뒤로가기), iframe
// 주의사항: 프로젝트의 mock api 스타일 유지. 실제 API 연동 시 동일 인터페이스로 교체.

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/BackButton/BackButton";
import type { TermsDocMeta } from "../../api/mockDataTerms";
import { termsDocuments } from "../../api/mockDataTerms";

const PdfViewer = () => {
  const { docId } = useParams<{ docId: string }>();

  const doc: TermsDocMeta | undefined = useMemo(
    () => termsDocuments.find((d) => d.id === docId),
    [docId]
  );

  const url = doc?.url ?? "";

  return (
    <Container>
      <TopBar>
        <BackButton />
        <TopTitle>{doc?.title ?? "문서"}</TopTitle>
      </TopBar>

      {url ? (
        <Frame title={doc?.title ?? "PDF"} src={url} />
      ) : (
        <Empty>문서 링크를 찾을 수 없습니다.</Empty>
      )}
    </Container>
  );
};

export default PdfViewer;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const TopTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;


const Frame = styled.iframe`
  border: none;
  width: 100%;
  /* 100vh에서 헤더(약 48px) 및 여유 8px을 제외 */
  height: calc(100vh - 56px);
`;

const Empty = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.colors.lightGray};
`;


