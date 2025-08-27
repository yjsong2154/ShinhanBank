import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsDetailPage.styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DetailPageHeader from "./components/SavingDetailPageHeader/SavingDetailPageHeader";
import ProgressSection from "./components/ProgressSection/ProgressSection";
import { USER_ID } from "../../api/config";

const SavingsDetailPage = () => {
  const { data, loading, error } = useSavingsDetail();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const { bucket, comments } = data;
  const currentAmount = (bucket.current_progress / 100) * bucket.target_amount;

  // 로그인된 사용자와 적금통 소유자 ID 비교
  const isOwner = USER_ID === bucket.owner.id;

  return (
    <S.Container>
      <DetailPageHeader title={bucket.name} showMenu={isOwner} />

      <S.InfoSection>
        <div>작성자 | {bucket.owner.nickname}</div>
        <div>생성일 | {new Date(bucket.created_at).toLocaleDateString()}</div>
        <div>저축 상품 | {bucket.account_name}</div>
        <div>목표 금액 | {bucket.target_amount.toLocaleString()}원</div>
        <div>현재 금액 | {currentAmount.toLocaleString()}원</div>
        <div>만기일 | {new Date(bucket.last_progress_date).toLocaleDateString()}</div>
        <div>저축 주기 | {bucket.deposit_cycle}</div>
      </S.InfoSection>

      <S.DescriptionSection>
        <S.SectionTitle>저축통 설명</S.SectionTitle>
        <S.DescriptionText>{bucket.description}</S.DescriptionText>
      </S.DescriptionSection>

      <ProgressSection
        currentAmount={currentAmount}
        targetAmount={bucket.target_amount}
      />

      <S.CommentSection>
        <S.SectionTitle>댓글 ({comments.length})</S.SectionTitle>
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.author.nickname}</strong>: {comment.content}
          </div>
        ))}
      </S.CommentSection>
    </S.Container>
  );
};

export default SavingsDetailPage;
