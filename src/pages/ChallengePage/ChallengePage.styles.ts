import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 10px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const StatsContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px 16px;
  background-color: #f5f5f7;
  border-radius: 15px;
`;

export const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
`;

export const StatsTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatsSub = styled.div`
  font-size: 13px;
  color: #555;
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 13px;
  border-radius: 999px;
  background: #e5e3f3;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
  background: #9a77ff;
  border-radius: 999px;
  transition: width 0.3s ease;
`;

export const PercentLabel = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
`;

export const AchievementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
