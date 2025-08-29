import { Link } from 'react-router-dom';
import useSavings from '../../../../hooks/useSavings';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import * as S from './MySavingsList.styles';

const MySavingsList = () => {
  const { data: savings, loading, error } = useSavings();

  if (loading) return <LoadingSpinner />;
  if (error) return <S.EmptyMessage>적금 정보를 불러오는 중 오류가 발생했습니다.</S.EmptyMessage>;

  return (
    <S.Container>
      <S.Title>나의 저축통</S.Title>
      <S.SavingsList>
        {savings && savings.length > 0 ? (
          savings.map((item) => {
            const currentAmount = (item.current_progress / 100) * item.target_amount;
            return (
              <Link to={`/savings/${item.id}`} key={item.id}>
                <S.SavingsItem>
                  <S.SavingsInfo>
                    <S.Status $isCompleted={item.status === 'SUCCESS'}>
                      {item.status} 
                    </S.Status>
                    <S.SavingsTitle>{item.name}</S.SavingsTitle>
                    <S.AmountInfo>
                      <S.CurrentAmount>₩{currentAmount.toLocaleString()}</S.CurrentAmount>
                      <S.TargetAmount> / ₩{item.target_amount.toLocaleString()}</S.TargetAmount>
                    </S.AmountInfo>
                    <S.ProgressInfo>
                      <S.ProgressBar>
                        <S.Progress $progress={item.current_progress} />
                      </S.ProgressBar>
                      <S.ProgressText>{item.current_progress}% 달성</S.ProgressText>
                      <S.Period>{item.subscription_period}일</S.Period>
                    </S.ProgressInfo>
                  </S.SavingsInfo>
                </S.SavingsItem>
              </Link>
            );
          })
        ) : (
          <S.EmptyMessage>진행중인 적금이 없습니다.</S.EmptyMessage>
        )}
      </S.SavingsList>
    </S.Container>
  );
};

export default MySavingsList;