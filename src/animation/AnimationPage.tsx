import AvatarSOL from "../components/AvatarSOL/AvatarSOL";

export default function AniamtionPage() {
    return (
        <div style={{ padding: 24 }}>
            <AvatarSOL state="idle" size={240} />
            {/* 인사 모션 확인 */}
            {/* <AvatarSOL state="wave" size={240} /> */}
        </div>
    );
}