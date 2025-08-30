import * as S from './Character.styles';
import AvatarSOL from '../AvatarSOL/AvatarSOL';

interface CharacterId {
  character: number;
  cloth: number;
  hat: number;
}

type Char = 1 | 2 | 3 | 10 ;
type Cloth = 0| 6 | 5 | 4 | 11 ;
type Item = 0 | 7 | 8 | 9 | 12 ;

function toChar(n: number): Char {
  if (n === 1 || n === 2 || n === 3 || n === 10) return n;
  return 1;
}

function toCloth(n: number): Cloth {
  if (n === 0 || n === 6 || n === 5 || n === 4 || n === 11) return n;
  return 0;
}

function toItem(n: number): Item {
  if (n === 0 || n === 7 || n === 8 || n === 9 || n === 12) return n;
  return 0;
}

const Character: React.FC<CharacterId> = ({ character = 0, cloth = 0, hat = 0 }) => {
  return (
    <S.CharacterWrapper>
      <AvatarSOL size={250} character={toChar(character)} cloth={toCloth(cloth)} hat={toItem(hat)} />
    </S.CharacterWrapper>
  );
};

export default Character;