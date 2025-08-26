// src/components/animation/CharacterAnimation.tsx

import { useRef, useEffect } from 'react';

// 이미지 파일은 public 폴더에 있다고 가정합니다.
const bearHeadImg = '/bear/head.svg';
const bearEyeImg = '/bear/eye.svg';
const bearNoseImg = '/bear/nose.svg';
const bearMouthImg = '/bear/mouth.svg';

const CharacterAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const head = new Image();
        const eye = new Image();
        const nose = new Image();
        const mouth = new Image();

        head.src = bearHeadImg;
        eye.src = bearEyeImg;
        nose.src = bearNoseImg;
        mouth.src = bearMouthImg;

        let frame = 0;
        const totalFrames = 4; // 눈 깜박임 프레임 수
        // const eyeBlinkInterval = 100; // 눈 깜박임 속도

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 몸통과 머리 그리기 (고정)
            ctx.drawImage(head, 50, 50, 300, 300);

            // 눈, 코, 입 그리기 (위치 조정)
            ctx.drawImage(eye, 120, 150, 50, 50); // 왼쪽 눈
            ctx.drawImage(eye, 230, 150, 50, 50); // 오른쪽 눈
            ctx.drawImage(nose, 175, 200, 50, 50);
            ctx.drawImage(mouth, 170, 240, 60, 40);

            // 예시: 눈 깜박임 애니메이션
            // 눈 이미지 스프라이트 시트를 사용한다고 가정
            const eyeFrameX = (frame % totalFrames) * eye.width / totalFrames;
            ctx.drawImage(
                eye,
                eyeFrameX, 0, eye.width / totalFrames, eye.height,
                120, 150, 50, 50
            );

            // 프레임 업데이트
            frame++;

            requestAnimationFrame(animate);
        };

        // 모든 이미지가 로드된 후 애니메이션 시작
        Promise.all([
            new Promise(resolve => head.onload = resolve),
            new Promise(resolve => eye.onload = resolve),
            new Promise(resolve => nose.onload = resolve),
            new Promise(resolve => mouth.onload = resolve),
        ]).then(() => {
            animate();
        });
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ border: '1px solid black' }}
        />
    );
};

export default CharacterAnimation;