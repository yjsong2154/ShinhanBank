import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsDetailPage.styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DetailPageHeader from "./components/SavingDetailPageHeader/SavingDetailPageHeader";
import ProgressSection from "./components/ProgressSection/ProgressSection";

const SavingsDetailPage = () => {
  const { data, loading, error } = useSavingsDetail(1); // 가상 데이터 id 1 사용

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
      <DetailPageHeader title={data.title} />

      <S.InfoSection>
        <div>작성자 | {data.author}</div>
        <div>생성일 | {data.createdAt}</div>
        <div>저축 상품 | {data.product}</div>
        <div>목표 금액 | {data.targetAmount.toLocaleString()}원</div>
        <div>현재 금액 | {data.currentAmount.toLocaleString()}원</div>
        <div>만기일 | {data.dueDate}</div>
        <div>저축 주기 | {data.savingCycle}</div>
      </S.InfoSection>

      <S.DescriptionSection>
        <S.SectionTitle>저축통 설명</S.SectionTitle>
        <S.DescriptionText>{data.description}</S.DescriptionText>
      </S.DescriptionSection>

      <ProgressSection
        currentAmount={data.currentAmount}
        targetAmount={data.targetAmount}
      />

      <S.CommentSection>
        <S.SectionTitle>댓글 ({data.comments.length})</S.SectionTitle>
        {data.comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.author}</strong>: {comment.content}
          </div>
        ))}
      </S.CommentSection>
    </S.Container>
  );
};

export default SavingsDetailPage;
