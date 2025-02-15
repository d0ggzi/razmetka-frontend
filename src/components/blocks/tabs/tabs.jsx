import { TabButton, TabButtonContainer, TabContent } from "./styles";
import { useState } from "react";
function Tabs (props){
  const [activeTab, setActiveTab] = useState(1);

  const updateTab = (id) => {
    setActiveTab(id);
  }
  return (
    <>  
      <TabButtonContainer>
        {props.tabs.map((tab) => 
          <TabButton key={tab.id} $isActive={activeTab===tab.id} onClick={()=>updateTab(tab.id)}>{tab.name}</TabButton>
        )}
      </TabButtonContainer>
      {props.tabs.map((tab) => 
        <TabContent key={tab.id} $isActive={activeTab===tab.id} onClick={()=>updateTab(tab.id)}>
          {tab.content}
        </TabContent>
      )}
    </>
  );
}

export default Tabs;