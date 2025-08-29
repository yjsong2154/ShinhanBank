import React, { useState } from "react";
import styled from "styled-components";
import { createComment } from "../../../api/createComment";

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

const SubmitButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface CommentFormProps {
  bucketId: string;
  onCommentCreated: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ bucketId, onCommentCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newComment = await createComment(bucketId, { content });
      onCommentCreated(newComment.comment);
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CommentInput
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <SubmitButton type="submit">등록</SubmitButton>
    </FormContainer>
  );
};

export default CommentForm;
