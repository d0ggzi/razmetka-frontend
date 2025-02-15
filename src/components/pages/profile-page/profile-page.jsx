import Profile from "../../blocks/profile/profile";
import {MainSection} from "./styles.js";
import Tabs from "../../blocks/tabs/tabs.jsx";

function ProfilePage () {
  const tabs = [
    { id: 1,
      name: 'Профиль',
      content: <Profile/>,
    }
  ]


  return (
    <MainSection>
      <Tabs tabs={tabs}/>
    </MainSection>
  );
}

export default ProfilePage;