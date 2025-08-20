import { myPageData } from '../../../../api/mockData';
import * as S from './MySavingsList.styles';

const MySavingsList = () => {
  return (
    <S.Container>
      <S.Title>나의 저축통</S.Title>
      <S.SavingsList>
        {myPageData.savingsList.map((item) => (
          <S.SavingsItem key={item.id}>
            <S.SavingsInfo>
              <S.Status $isCompleted={item.status === '완료'}>
                {item.status}
              </S.Status>
              <S.SavingsTitle>{item.title}</S.SavingsTitle>
              <S.AmountInfo>
                <S.CurrentAmount>₩{item.currentAmount.toLocaleString()}</S.CurrentAmount>
                <S.TargetAmount> / ₩{item.targetAmount.toLocaleString()}</S.TargetAmount>
              </S.AmountInfo>
              <S.ProgressInfo>
                <S.ProgressBar>
                  <S.Progress $progress={item.progress} />
                </S.ProgressBar>
                <S.ProgressText>{item.progress}% 달성</S.ProgressText>
                <S.Period>{item.period}</S.Period>
              </S.ProgressInfo>
            </S.SavingsInfo>
          </S.SavingsItem>
        ))}
      </S.SavingsList>
    </S.Container>
  );
};

export default MySavingsList;