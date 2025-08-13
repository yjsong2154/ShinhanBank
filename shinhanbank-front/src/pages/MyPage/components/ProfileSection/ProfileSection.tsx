import React from 'react';
import * as S from './ProfileSection.styles';

interface ProfileSectionProps {
  name: string;
  studentId: string;
  university: string;
  linkedAccount: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ name, studentId, university, linkedAccount }) => {
  return (
    <S.Container>
      <S.ProfileInfoWrapper>
        <S.Name>{name}</S.Name>
        <S.StudentId>{studentId}</S.StudentId>
      </S.ProfileInfoWrapper>
      <S.DetailInfoWrapper>
        <S.InfoBox>
          <S.InfoTitle>소속 대학</S.InfoTitle>
          <S.InfoContent>{university}</S.InfoContent>
        </S.InfoBox>
        <S.InfoBox>
          <S.InfoTitle>연결 계좌</S.InfoTitle>
          <S.InfoContent>{linkedAccount}</S.InfoContent>
        </S.InfoBox>
      </S.DetailInfoWrapper>
    </S.Container>
  );
};

export default ProfileSection;