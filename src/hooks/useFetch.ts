import { useEffect, useState } from 'react';

// 제네릭 타입을 T로 선언합니다.
const useFetch = <T,>(fetcher: () => Promise<T>, deps: React.DependencyList = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher();
        setData(result);
      } catch (e) {
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps); // 의존성 배열을 외부에서 받습니다.

  return { data, loading, error };
};

export default useFetch;