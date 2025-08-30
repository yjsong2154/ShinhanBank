import React from 'react';
import * as S from './AlertDialog.styles';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <S.Overlay>
      <S.Container>
        <S.Message>{message}</S.Message>
        <S.ButtonWrapper>
          <S.Button 
            onClick={() => {
              onClose();
              // window.location.reload();   // 새로고침
  }         } className="confirm">
            확인
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Overlay>
  );
};

export default AlertDialog;
