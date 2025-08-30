import React, { useState } from "react";
import styled from "styled-components";
import { createComment } from "../../../api/createComment";
import deleteComment from "../../../api/deleteComment";

const FormContainer = styled.form`
  display: flex;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button<{ $loading?: boolean }>`
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #9a77ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.6 : 1)};
`;

/* ===== 리스트 UI ===== */
const CommentsList = styled.div`
  margin-top: 12px;
`;

const CommentRow = styled.div`
  display: flex;
  align-items: center; /* 같은 행 */
  justify-content: space-between; /* 아이콘 우측 끝 */
  gap: 8px;
  padding: 6px 0;
`;

const CommentText = styled.div`
  flex: 1;
  word-break: break-word;
`;

const Nick = styled.strong`
  margin-right: 6px;
`;

const DeleteBtn = styled.button<{ $loading?: boolean }>`
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.5 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* SVG 크기 */
  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

type AnyObj = Record<string, any>;

interface CommentItem {
  id: number | string;
  content: string;

  // 다양한 가능 키
  userId?: number | string;
  user_id?: number | string;
  authorId?: number | string;
  memberId?: number | string;

  nickname?: string;
  authorName?: string;
  userName?: string;

  user?: AnyObj;
  author?: AnyObj;
  writer?: AnyObj;
  member?: AnyObj;

  // 작성자 전용 키 (백엔드에 따라)
  writerId?: number | string;
  createdById?: number | string;
  created_by_id?: number | string;
  writerName?: string;
  writerNickname?: string;
  createdByName?: string;
  createdBy?: AnyObj;
  created_by?: AnyObj;
}

interface CommentFormProps {
  bucketId: string;
  onCommentCreated: (comment: any) => void;

  comments?: CommentItem[];
  onCommentDeleted?: (id: number | string) => void;

  // 부모가 직접 현재 로그인 사용자 정보를 넘길 수 있게
  currentUserId?: number | string;
  currentUserNickname?: string;
}

/* ==== 토큰에서 사용자 ====
   (부모가 넘기면 그 값을 우선 사용) */
const getUserFromToken = () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) return { id: null as any, nickname: null as any };
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    const id = payload?.userId ?? payload?.id ?? payload?.sub ?? null;
    const nickname =
      payload?.nickname ?? payload?.name ?? payload?.userName ?? null;
    return { id, nickname };
  } catch {
    return { id: null as any, nickname: null as any };
  }
};

/* 닉네임 정규화 비교 */
const norm = (s: any) =>
  (s ?? "")
    .toString()
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();

/* 소유자 id/name 추출 (작성자 계열 최우선) */
const getOwnerId = (c: CommentItem) => {
  const candidates = [
    // 작성자 최우선
    c.writerId,
    c.createdById,
    c.created_by_id,
    c.writer?.id,
    c.createdBy?.id,
    c.created_by?.id,

    // author 계열
    c.authorId,
    c.author?.id,

    // user/member 계열
    c.userId,
    c.user_id,
    c.memberId,
    c.user?.id,
    c.member?.id,
    c.author?.id, // 방어
  ];
  return candidates.find((v) => v !== undefined && v !== null) ?? null;
};

const getOwnerName = (c: CommentItem) => {
  const candidates = [
    // 작성자 이름/닉 우선
    c.writerName,
    c.writerNickname,
    c.createdByName,
    c.createdBy?.nickname,
    c.writer?.nickname,
    c.writer?.name,

    // author 계열
    c.authorName,
    c.author?.nickname,

    // user/member 계열
    c.nickname,
    c.userName,
    c.user?.nickname,
    c.user?.name,
    c.member?.nickname,
  ];
  return candidates.find((v) => !!v)?.toString() ?? "익명";
};

const CommentForm: React.FC<CommentFormProps> = ({
  bucketId,
  onCommentCreated,
  comments = [],
  onCommentDeleted,
  currentUserId,
  currentUserNickname,
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const tokenUser = getUserFromToken();
  const me = {
    id: currentUserId ?? tokenUser.id,
    nickname: currentUserNickname ?? tokenUser.nickname,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await createComment(bucketId, { content: trimmed });
      const created = res?.comment ?? res ?? {};

      // 즉시 렌더링용 보강
      if (me.id && created.userId == null && created.authorId == null) {
        created.userId = String(me.id);
      }
      if (!created.author) created.author = {};
      if (!created.author.nickname && me.nickname) {
        created.author.nickname = me.nickname;
      }
      if (!created.author.id && me.id) {
        created.author.id = me.id;
      }

      onCommentCreated(created);
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("댓글 등록에 실패했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number | string) => {
    if (deletingId) return;
    setDeletingId(commentId);
    try {
      await deleteComment(bucketId, commentId);
      onCommentDeleted?.(commentId);
    } catch (e) {
      console.error(e);
      alert("댓글 삭제에 실패했어요.");
    } finally {
      setDeletingId(null);
    }
  };

  const isMyComment = (c: CommentItem) => {
    const ownerId = getOwnerId(c);
    const ownerName = getOwnerName(c);
    if (ownerId != null && me.id != null && String(ownerId) === String(me.id))
      return true;
    if (me.nickname && ownerName && norm(me.nickname) === norm(ownerName))
      return true;
    return false;
  };

  // 개발용 로그
  if (import.meta?.env?.DEV) {
    console.debug("[Comments] me:", me);
    comments.forEach((c) => {
      const ownerId = getOwnerId(c);
      const ownerName = getOwnerName(c);
      const canDelete =
        (ownerId != null &&
          me.id != null &&
          String(ownerId) === String(me.id)) ||
        (me.nickname && ownerName && norm(me.nickname) === norm(ownerName));
      console.debug("[Comments] item", {
        id: c.id,
        ownerId,
        ownerName,
        canDelete,
      });
    });
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton
          type="submit"
          $loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </SubmitButton>
      </FormContainer>

      {/* 리스트 + 본인만 삭제 아이콘 */}
      <CommentsList>
        {comments.map((c) => {
          const name = getOwnerName(c);
          const canDelete = isMyComment(c);

          return (
            <CommentRow key={c.id}>
              <CommentText>
                <Nick>{name}</Nick>: {c.content}
              </CommentText>

              {canDelete && (
                <DeleteBtn
                  aria-label="댓글 삭제"
                  title="삭제"
                  onClick={() => handleDelete(c.id)}
                  $loading={deletingId === c.id}
                  disabled={deletingId === c.id}
                >
                  {/* 인라인 SVG (정적 파일 의존 X) */}
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path
                      d="M9 3v1H4v2h16V4h-5V3H9zm-2 6h2v9H7V9zm5 0h2v9h-2V9zm-7 0v11a2 2 0 002 2h8a2 2 0 002-2V9H5z"
                      fill="currentColor"
                    />
                  </svg>
                </DeleteBtn>
              )}
            </CommentRow>
          );
        })}
      </CommentsList>
    </>
  );
};

export default CommentForm;
