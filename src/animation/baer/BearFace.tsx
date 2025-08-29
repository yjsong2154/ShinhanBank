// components/bear/BearFace.tsx
import BearEyes from './BearEyes';
import BearNose from './BearNose';
// ... BearMouth 등 추가

const BearFace = () => {
    return (
        <div className="bear-face">
            <BearEyes />
            <BearNose />
            {/* 다른 부위 컴포넌트 */}
        </div>
    );
};

export default BearFace;