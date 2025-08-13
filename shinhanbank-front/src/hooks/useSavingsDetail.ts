import { useEffect, useState } from 'react';
import { savingsDetail } from '../api/mockDataSaving';

// 데이터 타입을 정의해줍니다.
export interface SavingsDetailType {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  product: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  savingCycle: string;
  description: string;
  progressPercentage: number;
  comments: CommentType[];
}

interface CommentType {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const useSavingsDetail = (id: number) => {
  const [data, setData] = useState<SavingsDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavingsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // 실제 API 호출 로직은 나중에 여기에 추가됩니다.
        // const response = await fetch(`/api/savings/${id}`);
        // const data = await response.json();

        // 현재는 가상 데이터로 대체
        await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 효과를 위한 딜레이
        setData(savingsDetail);
      } catch (e) {
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsDetail();
  }, [id]);

  return { data, loading, error };
};

export default useSavingsDetail;