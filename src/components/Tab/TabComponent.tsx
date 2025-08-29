import React, { useState } from 'react';
import * as S from './TabComponent.styles';

interface Tab {
  name: string;
  component: React.ReactNode;
}

interface TabComponentProps {
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <S.TabContainer>
      <S.TabHeader>
        {tabs.map((tab) => (
          <S.TabButton
            key={tab.name}
            $isActive={activeTab === tab.name}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </S.TabButton>
        ))}
      </S.TabHeader>
      <S.TabContent>
        {tabs.map((tab) => (
          <S.TabPanel
            key={tab.name}
            style={{ display: activeTab === tab.name ? 'block' : 'none' }}
          >
            {tab.component}
          </S.TabPanel>
        ))}
      </S.TabContent>
    </S.TabContainer>
  );
};

export default TabComponent;