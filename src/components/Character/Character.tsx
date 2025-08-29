import * as S from './Character.styles';
import AvatarSOL from '../AvatarSOL/AvatarSOL';

interface CharacterId {
  character: number;
  cloth: number;
  hat: number;
}

type Char = 1 | 2 | 3;

function toChar(n: number): Char {
  if (n === 1 || n === 2 || n === 3) return n;
  return 1;
}

type Out = 0 | 1 | 2 | 3;

function toOUt(n: number): Out {
  if (n === 0 ||n === 1 || n === 2 || n === 3) return n;
  return 0;
}

const Character: React.FC<CharacterId> = ({ character = 0, cloth = 0, hat = 0 }) => {
  return (
    <S.CharacterWrapper>
      <AvatarSOL size={250} character={toChar(character)} cloth={toOUt(cloth)} hat={toOUt(hat)} />
    </S.CharacterWrapper>
  );
};

export default Character;