import Tabs from "../../blocks/tabs/tabs";
import {MainSection, ProjectHeader, ProjectName} from "./styles";
import {useAuth} from "../../../context/useAuth.jsx";
import Profile from "../../blocks/profile/profile.jsx";

function MainPage(props) {
    const tabs = [
        {
            id: 1,
            name: 'Решение',
            content: <Profile/>,
        },
        {
            id: 2,
            name: 'Ошибки',
            content: <Profile/>,
        }
    ]
    return (
        <>
            <ProjectHeader>
                <ProjectName><strong>{props.selectedProject}</strong></ProjectName>
            </ProjectHeader>

            <MainSection>
                <Tabs {...props} tabs={tabs}/>
            </MainSection>
        </>
    );
}

export default MainPage;