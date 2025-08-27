import useFetch from './useFetch';
import { characterInfo } from '../api/mockDataSaving';

export interface CharacterInfoType {
  backgroundUrl: string;
  characterUrl: string;
  clothesUrl: string;
  accessoryUrl: string;
}

const fetchCharacter = async (): Promise<CharacterInfoType> => {
  // 실제 API 호출 로직을 여기에 구현합니다.
  // const response = await fetch(`/api/savings/${id}`);
  // const data = await response.json();
  // return data;

  await new Promise(resolve => setTimeout(resolve, 500));
  return characterInfo;
};

const useCharacter = (id: string) => {
  // console.log("id : ", id)
  return useFetch<CharacterInfoType>(fetchCharacter, []);
};

export default useCharacter;