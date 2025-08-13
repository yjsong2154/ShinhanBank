import { useEffect, useState } from 'react';
import { characterInfo } from '../api/mockDataSaving';

export interface CharacterInfoType {
  backgroundUrl: string;
  characterUrl: string;
  clothesUrl: string;
  accessoryUrl: string;
}

const useCharacter = () => {
  const [data, setData] = useState<CharacterInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        // 실제 API 호출 로직은 나중에 여기에 추가됩니다.
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(characterInfo);
      } catch (e) {
        setError('캐릭터 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []); // 의존성 배열을 비워두어 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.

  return { data, loading, error };
};

export default useCharacter;