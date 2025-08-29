/**
 * 프로필 섹션: 사용자 정보 표시 및 닉네임 인라인 수정 기능 제공
 */
import * as S from "./ProfileSection.styles";
import useUserInfo from "../../../../hooks/useUserInfo";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { getUniversityLogo } from "../../../../utils/university";
import { useEffect, useState } from "react";
import { updateNickname } from "../../../../api/updateNickname";

const ProfileSection = () => {
  const userId = sessionStorage.getItem("user_id");
  const { data: user, loading, error } = useUserInfo(userId || "");

  // 닉네임 표시값을 로컬 상태로 관리하여 API 성공 시 즉시 반영
  const [displayNickname, setDisplayNickname] = useState<string>("");

  // 편집 모드 및 입력값 상태
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 사용자 데이터 로드 후 닉네임 초기화
  useEffect(() => {
    if (user) {
      setDisplayNickname(user.nickname);
    }
  }, [user]);

  // 편집 모드 진입
  const onEditClick = () => {
    // 공백 및 길이 검증은 제출 시에 처리
    setNicknameInput(displayNickname);
    setIsEditing(true);
  };

  // 닉네임 저장
  const onConfirm = async () => {
    const next = nicknameInput.trim();
    if (!next) {
      // 빈 문자열 방지: 사용성 보호
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (next === displayNickname) {
      // 변경 없을 경우 편집 모드만 종료
      setIsEditing(false);
      return;
    }
    try {
      setIsSaving(true);
      const res = await updateNickname(next);
      // 서버 응답 닉네임으로 즉시 반영
      setDisplayNickname(res.nickname);
      setIsEditing(false);
    } catch (e) {
      // 단순 경고 노출: 과도한 처리 지양
      const message = e instanceof Error ? e.message : "닉네임 변경 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );
  if (error) return <S.Container>Error: {error}</S.Container>;
  if (!user)
    return <S.Container>사용자 정보를 불러올 수 없습니다.</S.Container>;

  return (
    <S.Container>
      {/* ✅ 소속 대학 위쪽에 작게 */}
      <S.UniversityRow>
        <S.UnivLogo
          src={getUniversityLogo(user.university.id)}
          alt={`${user.university.name} 로고`}
        />
        <S.UniversityName>{user.university.name}</S.UniversityName>
      </S.UniversityRow>

      {/* ✅ 닉네임 + 이메일 */}
      <S.ProfileInfoWrapper>
        {isEditing ? (
          <S.NameRow>
            <S.NameInput
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="닉네임 입력"
              disabled={isSaving}
            />
            <S.ConfirmButton onClick={onConfirm} disabled={isSaving}>
              {isSaving ? "저장중" : "확인"}
            </S.ConfirmButton>
          </S.NameRow>
        ) : (
          <S.NameRow>
            <S.Name>{displayNickname}</S.Name>
            <S.EditIcon
              src="/icons/edit-pen.svg"
              alt="닉네임 수정"
              onClick={onEditClick}
            />
          </S.NameRow>
        )}
        <S.StudentId>{user.email}</S.StudentId>
      </S.ProfileInfoWrapper>
    </S.Container>
  );
};

export default ProfileSection;
