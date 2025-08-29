import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsDetailPage.styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DetailPageHeader from "./components/SavingDetailPageHeader/SavingDetailPageHeader";
import ProgressSection from "./components/ProgressSection/ProgressSection";
import CommentForm from "./components/CommentForm";
import { useState, useEffect } from "react";

const SavingsDetailPage = () => {
  const { data, loading, error } = useSavingsDetail();
  const [comments, setComments] = useState(data?.comments || []);

  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const { bucket } = data;
  const currentAmount = (bucket.current_progress / 100) * bucket.target_amount;

  const userId = sessionStorage.getItem('user_id');
  const isOwner = userId === String(bucket.owner.id);
  console.log("Is Owner:", userId, bucket.owner.id, isOwner);

  const handleCommentCreated = (newComment: any) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

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
        <CommentForm bucketId={String(bucket.id)} onCommentCreated={handleCommentCreated} />
      </S.CommentSection>
    </S.Container>
  );
};

export default SavingsDetailPage;
