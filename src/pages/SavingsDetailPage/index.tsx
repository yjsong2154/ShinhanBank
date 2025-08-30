import useSavingsDetail from "../../hooks/useSavingsDetail";
import * as S from "./SavingsDetailPage.styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DetailPageHeader from "./components/SavingDetailPageHeader/SavingDetailPageHeader";
import ProgressSection from "./components/ProgressSection/ProgressSection";
import CommentForm from "./components/CommentForm";
import { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";

const SavingsDetailPage = () => {
  const { data, loading, error } = useSavingsDetail();
  const [comments, setComments] = useState<any[]>(data?.comments || []);

  // 현재 로그인 사용자
  const sessionUserId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("user_id") || ""
      : "";
  const { data: me } = useUserInfo(sessionUserId);

  useEffect(() => {
    if (data) setComments(data.comments || []);
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  const { bucket } = data;
  const currentAmount = (bucket.current_progress / 100) * bucket.target_amount;
  console.log("bucket:", bucket);

  const myId = sessionStorage.getItem("user_id") || undefined;
  const myNickname =
    me?.nickname ||
    sessionStorage.getItem("nickname") ||
    localStorage.getItem("nickname") ||
    undefined;

  // 버킷 소유자 여부(헤더 메뉴 제어)
  const isOwner = myId != null && String(myId) === String(bucket.owner.id);
  console.log("Is Owner:", myId, bucket.owner.id, isOwner);

  const handleCommentCreated = (comment: any) => {
    // 서버가 author 정보를 일부 누락해도 보완
    const enriched = {
      ...comment,
      author: {
        ...(comment?.author || {}),
        id: comment?.author?.id ?? myId,
        nickname: comment?.author?.nickname ?? myNickname ?? "나",
      },
    };
    setComments((prev) => [...prev, enriched]);
  };

  const handleCommentDeleted = (id: number | string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <S.Container>
      <DetailPageHeader
        title={bucket.name}
        showMenu={isOwner}
        initialIsLiked={bucket.is_liked}
      />

      <S.InfoSection>
        <div>작성자 | {bucket.owner.nickname}</div>
        <div>생성일 | {new Date(bucket.created_at).toLocaleDateString()}</div>
        <div>저축 상품 | {bucket.account_name}</div>
        <div>목표 금액 | {bucket.target_amount.toLocaleString()}원</div>
        <div>현재 금액 | {currentAmount.toLocaleString()}원</div>
        <div>
          만기일 | {new Date(bucket.last_progress_date).toLocaleDateString()}
        </div>
        <div>저축 주기 | {bucket.deposit_cycle}</div>
      </S.InfoSection>

      <S.DescriptionSection>
        <S.SectionTitle>저축통 설명</S.SectionTitle>
        <S.DescriptionText>{bucket.description}</S.DescriptionText>
      </S.DescriptionSection>

      <ProgressSection
        currentAmount={currentAmount}
        targetAmount={bucket.target_amount}
        character={parseInt(bucket.owner.character.character_item.id)}
        cloth={parseInt(bucket.owner.character.outfit_item.id)}
        hat={parseInt(bucket.owner.character.hat_item.id)}
      />

      <S.CommentSection>
        <S.SectionTitle>댓글 ({comments.length})</S.SectionTitle>

        {/* ✅ 리스트 + 본인만 삭제 아이콘은 CommentForm에서 처리 */}
        <CommentForm
          bucketId={String(bucket.id)}
          comments={comments}
          onCommentCreated={handleCommentCreated}
          onCommentDeleted={handleCommentDeleted}
          currentUserId={myId}
          currentUserNickname={myNickname}
        />
      </S.CommentSection>
    </S.Container>
  );
};

export default SavingsDetailPage;
