import Tabs from "../../blocks/tabs/tabs";
import {MainSection, ProjectHeader, ProjectName} from "./styles";
import Profile from "../../blocks/profile/profile.jsx";
import Markup from "../../blocks/markUp/markup.jsx";

function MainPage(props) {
    const tabs = [
        {
            id: 1,
            name: 'Решение',
            content: <Markup selectedProjectName={props.selectedProjectName} selectedProjectId={props.selectedProjectId}/>,
        },
        {
            id: 2,
            name: 'Ошибки',
            content: <p>Тут будут ошибки</p>,
        }
    ]
    return (
        <>
            <ProjectHeader>
                <ProjectName><strong>Проект: {props.selectedProjectName}</strong></ProjectName>
            </ProjectHeader>

            <MainSection>
                <Tabs {...props} tabs={tabs}/>
            </MainSection>
        </>
    );
}

export default MainPage;