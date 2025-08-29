// ChallengeHistory.tsx
import TabComponent from "../../../../components/Tab/TabComponent";
import { myPageData } from "../../../../api/mockData";
import * as S from "./ChallengeHistory.styles";
import stampActive from "../../../../assets/icons/stamp_active.svg";
import stampDeactive from "../../../../assets/icons/stamp_deactive.svg";
import nextIcon from "../../../../assets/icons/next_icon.svg"; // ▶ 모양(>)

const fmtMD = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;

const getLast7Days = () => {
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - 6 + i);
    return d;
  });
};

const ChallengeHistory = () => {
  const current = myPageData.challengeHistory.inProgress[0];
  const activeCount = Math.min(
    7,
    Math.max(0, Math.round((current.progress / 100) * 7))
  );
  const week = getLast7Days();

  const goSomewhere = () => {
    // TODO: 경로 결정되면 여기서 navigate('/challenge/detail/:id') 같은 로직 연결
    // 지금은 포인터만 동작하도록
    console.log("next clicked");
  };

  const inProgressView = (
    <S.ChallengeCard>
      <S.Header>
        <S.HeaderTitle>
          {current.title}
          <S.NextPointer
            src={nextIcon}
            alt="자세히 보기"
            role="button"
            tabIndex={0}
            onClick={goSomewhere}
            onKeyDown={(e) => (e.key === "Enter" ? goSomewhere() : null)}
          />
        </S.HeaderTitle>
      </S.Header>

      <S.Content>{current.content}</S.Content>

      <S.StampGrid>
        {week.map((d, idx) => {
          const active = idx < activeCount;
          return (
            <S.StampItem key={idx}>
              <S.StampIcon
                src={active ? stampActive : stampDeactive}
                alt={active ? "stamp-active" : "stamp-deactive"}
              />
              <S.DateText>{fmtMD(d)}</S.DateText>
            </S.StampItem>
          );
        })}
      </S.StampGrid>

      <S.RowEnd>
        <S.Period>{current.period}</S.Period>
        <S.Reward>{current.reward}</S.Reward>
      </S.RowEnd>
    </S.ChallengeCard>
  );

  const completedList = myPageData.challengeHistory.completed.map((item) => (
    <S.ChallengeItem key={item.id}>
      <S.ChallengeInfo>
        <S.Title>{item.title}</S.Title>
        <S.SubText>{item.content}</S.SubText>
      </S.ChallengeInfo>
      <S.RightInfo>
        <S.Period>완료</S.Period>
        <S.Reward>{item.reward}</S.Reward>
      </S.RightInfo>
    </S.ChallengeItem>
  ));

  const tabs = [
    {
      name: `진행 중인 챌린지`,
      component: <S.ChallengeList>{inProgressView}</S.ChallengeList>,
    },
    {
      name: `종료된 챌린지 (${myPageData.challengeHistory.completed.length})`,
      component: <S.ChallengeList>{completedList}</S.ChallengeList>,
    },
  ];

  return (
    <S.Container>
      <S.BigTitle>챌린지 기록</S.BigTitle>
      <TabComponent tabs={tabs} />
    </S.Container>
  );
};

export default ChallengeHistory;
