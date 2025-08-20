import useFetch from './useFetch';
import { savingsDetail } from '../api/mockDataSaving';

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

const fetchSavingsDetail = async (id: number): Promise<SavingsDetailType> => {
  // 실제 API 호출 로직을 여기에 구현합니다.
  // const response = await fetch(`/api/savings/${id}`);
  // const data = await response.json();
  // return data;

  await new Promise(resolve => setTimeout(resolve, 500));
  return savingsDetail;
};

const useSavingsDetail = (id: number) => {
  return useFetch<SavingsDetailType>(() => fetchSavingsDetail(id), [id]);
};

export default useSavingsDetail;